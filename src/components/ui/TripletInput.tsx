interface TripletInputProps {
  label: string;
  values: [string, string, string];
  onChange: (index: number, value: string) => void;
  placeholder?: string;
}

export function TripletInput({ label, values, onChange, placeholder = '' }: TripletInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium" style={{ color: 'var(--tg-text)' }}>{label}</p>
      {values.map((val, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-sm font-bold w-5 text-center" style={{ color: 'var(--tg-hint)' }}>
            {i + 1}.
          </span>
          <input
            type="text"
            value={val}
            onChange={(e) => onChange(i, e.target.value)}
            placeholder={placeholder || `${i + 1}-е`}
            className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--tg-secondary-bg)',
              color: 'var(--tg-text)',
              border: '1.5px solid transparent',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--tg-button)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
          />
        </div>
      ))}
    </div>
  );
}
