interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs" style={{ color: 'var(--tg-hint)' }}>
          {current + 1} / {total}
        </span>
        <span className="text-xs font-medium" style={{ color: 'var(--tg-hint)' }}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'var(--tg-secondary-bg)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--tg-button)' }}
        />
      </div>
    </div>
  );
}
