import { useState } from 'react';
import type { Photo } from '../../types/yearCompass';

interface PhotoUploadProps {
  photos: Photo[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
}

export function PhotoUpload({ photos, onAdd, onRemove, onCaptionChange }: PhotoUploadProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Photo strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setEditingId(editingId === photo.id ? null : photo.id)}
          >
            <img
              src={photo.dataUrl}
              alt={photo.caption || 'photo'}
              className="w-full h-full object-cover"
            />
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(photo.id);
              }}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              ×
            </button>
            {/* Caption indicator */}
            {photo.caption && (
              <div
                className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-white text-[9px] truncate"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                {photo.caption}
              </div>
            )}
          </div>
        ))}

        {/* Add button */}
        <button
          onClick={onAdd}
          className="flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 border-2 border-dashed"
          style={{ borderColor: 'var(--tg-button)', color: 'var(--tg-button)' }}
        >
          <span className="text-2xl leading-none">+</span>
          <span className="text-[10px] font-medium">Фото</span>
        </button>
      </div>

      {/* Caption editor */}
      {editingId && (
        <div
          className="rounded-xl p-3 flex flex-col gap-2"
          style={{ background: 'var(--tg-secondary-bg)' }}
        >
          <img
            src={photos.find(p => p.id === editingId)?.dataUrl}
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <input
            type="text"
            value={photos.find(p => p.id === editingId)?.caption ?? ''}
            onChange={(e) => onCaptionChange(editingId, e.target.value)}
            placeholder="Добавить подпись..."
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: 'var(--tg-bg)',
              color: 'var(--tg-text)',
              border: '1px solid var(--tg-hint)',
            }}
            autoFocus
          />
          <button
            onClick={() => setEditingId(null)}
            className="text-sm font-medium py-1"
            style={{ color: 'var(--tg-button)' }}
          >
            Готово
          </button>
        </div>
      )}
    </div>
  );
}
