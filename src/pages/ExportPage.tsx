import { useState } from 'react';
import { useYearCompassStore } from '../store/yearCompassStore';
import { exportZip, exportMarkdownSingleFile, downloadBlob } from '../utils/exportZip';
import { generateCollage } from '../utils/exportCollage';
import { getTelegramWebApp } from '../hooks/useTelegram';

type ExportStatus = 'idle' | 'loading' | 'done' | 'error';

interface ExportState {
  zip: ExportStatus;
  md: ExportStatus;
  collage: ExportStatus;
}

export function ExportPage() {
  const data = useYearCompassStore(s => s.data);
  const photos = useYearCompassStore(s => s.photos);
  const setPage = useYearCompassStore(s => s.setPage);
  const resetForYear = useYearCompassStore(s => s.resetForYear);

  const [status, setStatus] = useState<ExportState>({ zip: 'idle', md: 'idle', collage: 'idle' });
  const [collagePreview, setCollagePreview] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);

  const year = data.year;
  const allPhotos = photos;
  const tg = getTelegramWebApp();

  async function handleZipExport() {
    setStatus(s => ({ ...s, zip: 'loading' }));
    try {
      const blob = await exportZip(data, allPhotos);
      downloadBlob(blob, `YearCompass-${year}.zip`);
      setStatus(s => ({ ...s, zip: 'done' }));
      tg.HapticFeedback.notificationOccurred('success');
    } catch (err) {
      console.error(err);
      setStatus(s => ({ ...s, zip: 'error' }));
    }
  }

  function handleMdExport() {
    setStatus(s => ({ ...s, md: 'loading' }));
    try {
      const blob = exportMarkdownSingleFile(data, allPhotos);
      downloadBlob(blob, `YearCompass-${year}.md`);
      setStatus(s => ({ ...s, md: 'done' }));
      tg.HapticFeedback.notificationOccurred('success');
    } catch (err) {
      console.error(err);
      setStatus(s => ({ ...s, md: 'error' }));
    }
  }

  async function handleCollageExport() {
    if (!allPhotos.length) {
      alert('Нет фото для коллажа. Добавь фотографии в разделах "Лучшие моменты" или "Мечтай без ограничений".');
      return;
    }
    setStatus(s => ({ ...s, collage: 'loading' }));
    try {
      const blob = await generateCollage(allPhotos, {
        title: `Year Compass ${year}`,
        bgColor: '#1a1a2e',
      });
      const url = URL.createObjectURL(blob);
      setCollagePreview(url);
      setStatus(s => ({ ...s, collage: 'done' }));
      tg.HapticFeedback.notificationOccurred('success');
    } catch (err) {
      console.error(err);
      setStatus(s => ({ ...s, collage: 'error' }));
    }
  }

  function handleDownloadCollage() {
    if (!collagePreview) return;
    fetch(collagePreview)
      .then(r => r.blob())
      .then(blob => downloadBlob(blob, `YearCompass-${year}-collage.jpg`));
  }

  function handleReset() {
    resetForYear(new Date().getFullYear());
    setPage('welcome');
  }

  const ExportButton = ({
    label,
    emoji,
    description,
    state,
    onClick,
  }: {
    label: string;
    emoji: string;
    description: string;
    state: ExportStatus;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      disabled={state === 'loading'}
      className="w-full rounded-2xl p-4 text-left flex items-start gap-3 transition-opacity"
      style={{
        background: state === 'done' ? '#d1fae520' : 'var(--tg-secondary-bg)',
        opacity: state === 'loading' ? 0.7 : 1,
        border: state === 'done' ? '1.5px solid #10b981' : '1.5px solid transparent',
      }}
    >
      <span className="text-2xl">{state === 'loading' ? '⏳' : state === 'done' ? '✅' : emoji}</span>
      <div>
        <p className="font-semibold text-sm" style={{ color: 'var(--tg-text)' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--tg-hint)' }}>{description}</p>
        {state === 'error' && (
          <p className="text-xs mt-0.5 text-red-500">Ошибка. Попробуй ещё раз.</p>
        )}
      </div>
    </button>
  );

  return (
    <div className="flex flex-col gap-5 px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-2">🎉</div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--tg-text)' }}>
          Year Compass {year} готов!
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--tg-hint)' }}>
          Выбери формат экспорта
        </p>
      </div>

      {/* Export options */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--tg-hint)' }}>
          📦 Obsidian
        </p>

        <ExportButton
          label="ZIP-архив для Obsidian"
          emoji="🗂️"
          description="Markdown + папка с фото. Распакуй в vault."
          state={status.zip}
          onClick={handleZipExport}
        />

        <ExportButton
          label="Единый Markdown файл"
          emoji="📄"
          description="Один .md файл с встроенными фото (base64)"
          state={status.md}
          onClick={handleMdExport}
        />

        <p className="text-xs font-semibold uppercase tracking-wider mt-2" style={{ color: 'var(--tg-hint)' }}>
          🖼️ Коллаж
        </p>

        <ExportButton
          label={`Коллаж из ${allPhotos.length} фото`}
          emoji="🎨"
          description="Красивая сетка фото с подписями. JPEG."
          state={status.collage}
          onClick={handleCollageExport}
        />
      </div>

      {/* Collage preview */}
      {collagePreview && (
        <div className="flex flex-col gap-2">
          <img
            src={collagePreview}
            alt="Коллаж"
            className="w-full rounded-2xl"
          />
          <button
            onClick={handleDownloadCollage}
            className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--tg-button)', color: 'var(--tg-button-text)' }}
          >
            ⬇️ Скачать коллаж
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => setPage('wizard')}
          className="w-full py-3 rounded-xl text-sm font-medium"
          style={{ background: 'var(--tg-secondary-bg)', color: 'var(--tg-text)' }}
        >
          ← Вернуться к разделам
        </button>

        {!showReset ? (
          <button
            onClick={() => setShowReset(true)}
            className="w-full py-2 text-sm"
            style={{ color: 'var(--tg-hint)' }}
          >
            Начать заново
          </button>
        ) : (
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--tg-secondary-bg)' }}
          >
            <p className="text-sm text-center" style={{ color: 'var(--tg-text)' }}>
              Удалить все данные и начать заново?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 py-2 rounded-xl text-sm"
                style={{ background: 'var(--tg-bg)', color: 'var(--tg-text)' }}
              >
                Отмена
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 rounded-xl text-sm font-semibold text-red-500"
                style={{ background: '#fee2e2' }}
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
