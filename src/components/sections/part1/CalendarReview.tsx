import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export function CalendarReview() {
  const monthNotes = useYearCompassStore(s => s.data.calendarReview.monthNotes);
  const overallNote = useYearCompassStore(s => s.data.calendarReview.overallNote);
  const updateMonth = useYearCompassStore(s => s.updateMonthNote);
  const updateOverall = useYearCompassStore(s => s.updateCalendarOverallNote);
  const year = useYearCompassStore(s => s.data.year);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Твой год по месяцам"
        subtitle={`Вспомни каждый месяц ${year} года — важные события, встречи, проекты`}
      />

      <div className="grid grid-cols-2 gap-3">
        {MONTHS.map((month, i) => {
          const note = monthNotes.find(m => m.month === i)?.note ?? '';
          return (
            <div
              key={i}
              className="rounded-2xl p-3"
              style={{ background: 'var(--tg-secondary-bg)' }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: 'var(--tg-button)' }}>
                {month}
              </p>
              <textarea
                value={note}
                onChange={(e) => updateMonth(i, e.target.value)}
                placeholder="Что было важного?"
                rows={3}
                className="w-full text-xs outline-none resize-none leading-relaxed"
                style={{
                  background: 'transparent',
                  color: 'var(--tg-text)',
                  border: 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      <TextArea
        label="Общее впечатление от года"
        value={overallNote}
        onChange={updateOverall}
        placeholder="Если бы ты описал(а) весь год одним абзацем..."
        minRows={4}
      />
    </div>
  );
}
