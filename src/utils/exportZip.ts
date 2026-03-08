import JSZip from 'jszip';
import type { YearCompassData, Photo } from '../types/yearCompass';
import { buildMarkdownString } from './exportMarkdown';

export async function exportZip(data: YearCompassData, photos: Photo[]): Promise<Blob> {
  const zip = new JSZip();
  const { year } = data;

  // Build photo filename map
  const filenames: Record<string, string> = {};
  photos.forEach((photo, index) => {
    const ext = photo.dataUrl.startsWith('data:image/png') ? 'png' : 'jpg';
    filenames[photo.id] = `photo-${String(index + 1).padStart(2, '0')}.${ext}`;
  });

  const folder = zip.folder(`YearCompass-${year}`)!;
  const imagesFolder = folder.folder('images')!;

  // Add markdown
  const markdown = buildMarkdownString(data, photos, filenames, 'obsidian-link');
  folder.file(`YearCompass-${year}.md`, markdown);

  // Add photos
  for (const photo of photos) {
    const base64Data = photo.dataUrl.split(',')[1];
    imagesFolder.file(filenames[photo.id], base64Data, { base64: true });
  }

  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}

export function exportMarkdownSingleFile(data: YearCompassData, photos: Photo[]): Blob {
  const markdown = buildMarkdownString(data, photos, {}, 'base64');
  return new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
