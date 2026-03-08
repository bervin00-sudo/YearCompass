import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

export function WordForYear() {
  const wordForYear = useYearCompassStore(s => s.data.wordForYear);
  const update = useYearCompassStore(s => s.updateWordForYear);
  const nextYear = useYearCompassStore(s => s.data.year + 1);

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Слово года"
        subtitle={`Одно слово, которое будет направлять тебя в ${nextYear} году`}
      />

      {/* Big word display */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'var(--tg-secondary-bg)' }}
      >
        {wordForYear.word ? (
          <p
            className="text-4xl font-bold"
            style={{ color: 'var(--tg-button)' }}
          >
            {wordForYear.word}
          </p>
        ) : (
          <p className="text-lg" style={{ color: 'var(--tg-hint)' }}>
            Твоё слово появится здесь
          </p>
        )}
      </div>

      <TextArea
        label="Твоё слово на год"
        value={wordForYear.word}
        onChange={(v) => update({ word: v })}
        placeholder="Одно слово..."
        singleLine
        maxLength={30}
      />

      <TextArea
        label="Почему именно это слово?"
        value={wordForYear.why}
        onChange={(v) => update({ why: v })}
        placeholder="Что оно значит для тебя? Почему оно важно?"
        minRows={4}
      />
    </div>
  );
}
