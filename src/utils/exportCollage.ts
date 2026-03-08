import type { Photo } from '../types/yearCompass';

interface CollageOptions {
  columns?: number;
  cellSize?: number;
  captionHeight?: number;
  headerHeight?: number;
  bgColor?: string;
  fontColor?: string;
  title?: string;
  gap?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function generateCollage(
  photos: Photo[],
  options: CollageOptions = {}
): Promise<Blob> {
  const {
    columns = photos.length <= 4 ? 2 : 3,
    cellSize = 400,
    captionHeight = 64,
    headerHeight = 80,
    bgColor = '#1a1a2e',
    fontColor = '#ffffff',
    title = 'Year Compass',
    gap = 8,
  } = options;

  if (!photos.length) {
    throw new Error('No photos to generate collage');
  }

  const rows = Math.ceil(photos.length / columns);
  const canvasWidth = columns * cellSize + (columns + 1) * gap;
  const canvasHeight = headerHeight + rows * (cellSize + captionHeight) + (rows + 1) * gap;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, bgColor + 'cc');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Header — title
  ctx.fillStyle = fontColor;
  ctx.font = `bold ${Math.round(headerHeight * 0.5)}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, canvasWidth / 2, headerHeight / 2);

  // Load all images in parallel
  const images = await Promise.all(photos.map(p => loadImage(p.dataUrl)));

  for (let i = 0; i < photos.length; i++) {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = gap + col * (cellSize + gap);
    const y = headerHeight + gap + row * (cellSize + captionHeight + gap);

    const img = images[i];

    // Rounded clip
    const radius = 16;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + cellSize - radius, y);
    ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius);
    ctx.lineTo(x + cellSize, y + cellSize - radius);
    ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize);
    ctx.lineTo(x + radius, y + cellSize);
    ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();

    // Object-fit: cover
    const scale = Math.max(cellSize / img.width, cellSize / img.height);
    const sw = cellSize / scale;
    const sh = cellSize / scale;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, x, y, cellSize, cellSize);

    // Gradient overlay at bottom for caption
    const captionGradient = ctx.createLinearGradient(x, y + cellSize - captionHeight, x, y + cellSize);
    captionGradient.addColorStop(0, 'rgba(0,0,0,0)');
    captionGradient.addColorStop(1, 'rgba(0,0,0,0.75)');
    ctx.fillStyle = captionGradient;
    ctx.fillRect(x, y + cellSize - captionHeight, cellSize, captionHeight);

    ctx.restore();

    // Caption text below photo
    const caption = photos[i].caption;
    if (caption) {
      ctx.fillStyle = fontColor;
      ctx.font = `${Math.round(captionHeight * 0.35)}px -apple-system, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Truncate if needed
      let text = caption;
      const maxWidth = cellSize - 16;
      while (ctx.measureText(text).width > maxWidth && text.length > 0) {
        text = text.slice(0, -1);
      }
      if (text !== caption) text = text.slice(0, -1) + '…';

      ctx.fillText(text, x + cellSize / 2, y + cellSize + captionHeight / 2);
    } else {
      // Photo number
      ctx.fillStyle = fontColor + '60';
      ctx.font = `${Math.round(captionHeight * 0.3)}px -apple-system, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, x + cellSize / 2, y + cellSize + captionHeight / 2);
    }
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
      'image/jpeg',
      0.92
    );
  });
}
