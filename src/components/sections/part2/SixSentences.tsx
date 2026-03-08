import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

export function SixSentences() {
  const sentences = useYearCompassStore(s => s.data.sixSentences.sentences);
  const update = useYearCompassStore(s => s.updateSixSentence);

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Шесть предложений"
        subtitle="Заверши каждое предложение — это твой курс на следующий год"
      />
      {sentences.map((s, i) => (
        <TextArea
          key={i}
          label={s.prompt}
          value={s.answer}
          onChange={(v) => update(i, v)}
          placeholder="Продолжи предложение..."
          minRows={2}
        />
      ))}
    </div>
  );
}
