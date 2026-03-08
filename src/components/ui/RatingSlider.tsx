interface RatingSliderProps {
  label: string;
  emoji: string;
  color: string;
  value: number;
  note: string;
  onRatingChange: (value: number) => void;
  onNoteChange: (note: string) => void;
}

export function RatingSlider({
  label,
  emoji,
  color,
  value,
  note,
  onRatingChange,
  onNoteChange,
}: RatingSliderProps) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: color }}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm" style={{ color: '#111' }}>
          {emoji} {label}
        </span>
        <span className="text-2xl font-bold" style={{ color: '#111' }}>{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs" style={{ color: '#666' }}>
        <span>1 — плохо</span>
        <span>10 — отлично</span>
      </div>
      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="Что произошло в этой сфере?"
        rows={2}
        className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none bg-white/60"
        style={{ color: '#111', border: '1px solid rgba(0,0,0,0.1)' }}
      />
    </div>
  );
}
