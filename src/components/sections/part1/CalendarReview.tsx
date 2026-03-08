import { useState } from 'react';
import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';
import { PhotoUpload } from '../../ui/PhotoUpload';
import { usePhotoManager } from '../../../hooks/usePhotoManager';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const MAX_PHOTOS_PER_MONTH = 10;

function MonthCard({ monthIndex }: { monthIndex: number }) {
  const [expanded, setExpanded] = useState(false);

  const note = useYearCompassStore(
    s => s.data.calendarReview.monthNotes.find(m => m.month === monthIndex)?.note ?? ''
  );
  const photoIds = useYearCompassStore(
    s => s.data.calendarReview.monthNotes.find(m => m.month === monthIndex)?.photoIds ?? []
  );
  const allPhotos = useYearCompassStore(s => s.photos);
  const updateMonth = useYearCompassStore(s => s.updateMonthNote);

  const sectionId = `month-${monthIndex}`;
  const sectionPhotos = allPhotos.filter(p => photoIds.includes(p.id));
  const { addPhoto, removePhoto, updateCaption } = usePhotoManager(sectionId);

  const canAddMore = sectionPhotos.length < MAX_PHOTOS_PER_MONTH;
  const hasContent = note.trim() || sectionPhotos.length > 0;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--tg-secondary-bg)' }}
    >
      {/* Month header — always visible */}
      <button
        className="w-full flex items-center justify-between px-3 py-2.5"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: 'var(--tg-button)' }}>
            {MONTHS[monthIndex]}
          </span>
          {hasContent && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ background: 'var(--tg-button)', color: 'var(--tg-button-text)' }}
            >
              {sectionPhotos.length > 0 ? `${sectionPhotos.length} 📸` : '✓'}
            </span>
          )}
        </div>
        <span className="text-xs" style={{ color: 'var(--tg-hint)' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Collapsed preview strip */}
      {!expanded && sectionPhotos.length > 0 && (
        <div className="flex gap-1 px-3 pb-2 overflow-x-auto">
          {sectionPhotos.slice(0, 4).map(p => (
            <img
              key={p.id}
              src={p.dataUrl}
              alt=""
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
          ))}
          {sectionPhotos.length > 4 && (
            <div
              className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--tg-hint)', color: '#fff' }}
            >
              +{sectionPhotos.length - 4}
            </div>
          )}
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="px-3 pb-3 flex flex-col gap-3">
          <textarea
            value={note}
            onChange={(e) => updateMonth(monthIndex, e.target.value)}
            placeholder="Что важного произошло?"
            rows={3}
            className="w-full text-sm outline-none resize-none leading-relaxed px-2 py-1.5 rounded-xl"
            style={{
              background: 'var(--tg-bg)',
              color: 'var(--tg-text)',
              border: '1px solid transparent',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--tg-button)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: 'var(--tg-text)' }}>
                📸 Фото месяца
              </span>
              <span className="text-xs" style={{ color: 'var(--tg-hint)' }}>
                {sectionPhotos.length}/{MAX_PHOTOS_PER_MONTH}
              </span>
            </div>
            <PhotoUpload
              photos={sectionPhotos}
              onAdd={canAddMore ? addPhoto : () => { alert(`Максимум ${MAX_PHOTOS_PER_MONTH} фото на месяц`); }}
              onRemove={removePhoto}
              onCaptionChange={updateCaption}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CalendarReview() {
  const overallNote = useYearCompassStore(s => s.data.calendarReview.overallNote);
  const updateOverall = useYearCompassStore(s => s.updateCalendarOverallNote);
  const year = useYearCompassStore(s => s.data.year);

  return (
    <div className="flex flex-col gap-3 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Твой год по месяцам"
        subtitle={`Нажми на месяц, чтобы добавить заметку и до ${MAX_PHOTOS_PER_MONTH} фото`}
      />

      {MONTHS.map((_, i) => (
        <MonthCard key={i} monthIndex={i} />
      ))}

      <div className="mt-2">
        <TextArea
          label={`Общее впечатление от ${year} года`}
          value={overallNote}
          onChange={updateOverall}
          placeholder="Если бы ты описал(а) весь год одним абзацем..."
          minRows={4}
        />
      </div>
    </div>
  );
}
