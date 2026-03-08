interface SectionHeaderProps {
  part?: 1 | 2;
  title: string;
  subtitle: string;
}

export function SectionHeader({ part, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1 pt-2 pb-2">
      {part && (
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--tg-button)' }}>
          {part === 1 ? '✦ Прошлый год' : '✦ Следующий год'}
        </span>
      )}
      <h1 className="text-xl font-bold leading-tight" style={{ color: 'var(--tg-text)' }}>
        {title}
      </h1>
      <p className="text-sm" style={{ color: 'var(--tg-hint)' }}>
        {subtitle}
      </p>
    </div>
  );
}
