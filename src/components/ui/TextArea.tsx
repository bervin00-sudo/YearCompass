import { useRef, useEffect } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxLength?: number;
  label?: string;
  hint?: string;
  singleLine?: boolean;
}

export function TextArea({
  value,
  onChange,
  placeholder = '',
  minRows = 3,
  maxLength,
  label,
  hint,
  singleLine = false,
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    const el = ref.current;
    if (!el || singleLine) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [value, singleLine]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--tg-text)' }}>
          {label}
        </label>
      )}
      {singleLine ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-colors"
          style={{
            background: 'var(--tg-secondary-bg)',
            color: 'var(--tg-text)',
            border: '1.5px solid transparent',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--tg-button)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
          }}
        />
      ) : (
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={minRows}
          className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none overflow-hidden transition-colors leading-relaxed"
          style={{
            background: 'var(--tg-secondary-bg)',
            color: 'var(--tg-text)',
            border: '1.5px solid transparent',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--tg-button)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
          }}
        />
      )}
      <div className="flex justify-between items-center">
        {hint && <span className="text-xs" style={{ color: 'var(--tg-hint)' }}>{hint}</span>}
        {maxLength && (
          <span className="text-xs ml-auto" style={{ color: 'var(--tg-hint)' }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
