import { useState, useEffect } from 'react';
import { useYearCompassStore } from '../store/yearCompassStore';
import { loadCompassData, loadPhotosForYear, getAllYears } from '../hooks/useStorage';

export function WelcomePage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [existingYears, setExistingYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setPage = useYearCompassStore(s => s.setPage);
  const loadData = useYearCompassStore(s => s.loadData);
  const resetForYear = useYearCompassStore(s => s.resetForYear);

  const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

  useEffect(() => {
    getAllYears().then(setExistingYears).catch(() => {});
  }, []);

  async function handleStart() {
    setIsLoading(true);
    try {
      const existing = await loadCompassData(selectedYear);
      if (existing) {
        const photos = await loadPhotosForYear(selectedYear);
        loadData(existing, photos);
      } else {
        resetForYear(selectedYear);
      }
      setPage('wizard');
    } catch (err) {
      console.error(err);
      resetForYear(selectedYear);
      setPage('wizard');
    } finally {
      setIsLoading(false);
    }
  }

  const hasExisting = existingYears.includes(selectedYear);

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 gap-8">
      {/* Logo area */}
      <div className="text-center">
        <div className="text-6xl mb-3">🧭</div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--tg-text)' }}>
          Year Compass
        </h1>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--tg-hint)' }}>
          Подведи итоги года и наметь путь<br />на следующий
        </p>
      </div>

      {/* Year selector */}
      <div
        className="w-full rounded-2xl p-4"
        style={{ background: 'var(--tg-secondary-bg)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--tg-hint)' }}>
          Выбери год
        </p>
        <div className="flex gap-2">
          {yearOptions.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: selectedYear === year ? 'var(--tg-button)' : 'var(--tg-bg)',
                color: selectedYear === year ? 'var(--tg-button-text)' : 'var(--tg-text)',
              }}
            >
              {year}
              {existingYears.includes(year) && (
                <span className="block text-[10px] opacity-70">продолжить</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        disabled={isLoading}
        className="w-full py-4 rounded-2xl font-semibold text-base transition-opacity"
        style={{
          background: 'var(--tg-button)',
          color: 'var(--tg-button-text)',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Загрузка...' : hasExisting ? `Продолжить ${selectedYear}` : `Начать ${selectedYear}`}
      </button>

      {/* Info */}
      <div className="text-center">
        <p className="text-xs leading-relaxed" style={{ color: 'var(--tg-hint)' }}>
          15 разделов · Фото · Экспорт в Obsidian<br />
          Всё хранится только на твоём устройстве
        </p>
      </div>
    </div>
  );
}
