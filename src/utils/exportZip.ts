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

export function getMarkdownText(data: YearCompassData, photos: Photo[]): string {
  return buildMarkdownString(data, photos, {}, 'base64');
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  // Use target="_blank" to avoid navigating away from Telegram WebApp
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older WebViews
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}
