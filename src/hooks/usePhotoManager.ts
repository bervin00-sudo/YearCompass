import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useYearCompassStore } from '../store/yearCompassStore';
import { savePhoto, deletePhoto } from './useStorage';
import type { Photo } from '../types/yearCompass';

const MAX_SIZE = 1024;
const JPEG_QUALITY = 0.82;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function usePhotoManager(sectionId: string) {
  const year = useYearCompassStore(s => s.data.year);
  const addPhotoToStore = useYearCompassStore(s => s.addPhoto);
  const removePhotoFromStore = useYearCompassStore(s => s.removePhoto);
  const updateCaptionInStore = useYearCompassStore(s => s.updatePhotoCaption);
  const updateBestMoments = useYearCompassStore(s => s.updateBestMoments);
  const updateDareToDream = useYearCompassStore(s => s.updateDareToDream);
  const updateMonthPhotoIds = useYearCompassStore(s => s.updateMonthPhotoIds);
  const bestMomentsPhotoIds = useYearCompassStore(s => s.data.bestMoments.photoIds);
  const dareToDreamPhotoIds = useYearCompassStore(s => s.data.dareToDream.photoIds);
  const monthNotes = useYearCompassStore(s => s.data.calendarReview.monthNotes);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onFileCallback = useRef<((file: File) => void) | null>(null);

  function triggerPicker(onFile: (file: File) => void) {
    onFileCallback.current = onFile;
    if (!inputRef.current) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && onFileCallback.current) onFileCallback.current(file);
        input.value = '';
      };
      document.body.appendChild(input);
      inputRef.current = input;
    }
    inputRef.current.click();
  }

  async function addPhoto() {
    triggerPicker(async (file) => {
      try {
        const dataUrl = await compressImage(file);
        const photo: Photo = {
          id: uuidv4(),
          dataUrl,
          caption: '',
          sectionId,
          uploadedAt: Date.now(),
        };
        addPhotoToStore(photo);
        await savePhoto({ ...photo, year });

        // Add to section's photoIds
        if (sectionId === 'bestMoments') {
          updateBestMoments({ photoIds: [...bestMomentsPhotoIds, photo.id] });
        } else if (sectionId === 'dareToDream') {
          updateDareToDream({ photoIds: [...dareToDreamPhotoIds, photo.id] });
        } else if (sectionId.startsWith('month-')) {
          const month = parseInt(sectionId.replace('month-', ''), 10);
          const mn = monthNotes.find(m => m.month === month);
          if (mn) {
            updateMonthPhotoIds(month, [...mn.photoIds, photo.id]);
          }
        }
      } catch (err) {
        console.error('Failed to add photo:', err);
      }
    });
  }

  async function removePhoto(photoId: string) {
    removePhotoFromStore(photoId);
    await deletePhoto(photoId);
  }

  function updateCaption(photoId: string, caption: string) {
    updateCaptionInStore(photoId, caption);
  }

  return { addPhoto, removePhoto, updateCaption };
}
