import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';
import { TripletInput } from '../../ui/TripletInput';

export function Closure() {
  const closure = useYearCompassStore(s => s.data.closure);
  const updateClosure = useYearCompassStore(s => s.updateClosure);
  const updateWord = useYearCompassStore(s => s.updateClosureWord);
  const year = useYearCompassStore(s => s.data.year);

  return (
    <div className="flex flex-col gap-6 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Прощание с годом"
        subtitle={`Завершение ${year} года`}
      />

      <TripletInput
        label="Три слова, которые описывают этот год"
        values={closure.threeWords}
        onChange={(i, v) => updateWord(i, v)}
        placeholder="слово"
      />

      <TextArea
        label="Если бы этот год был книгой или фильмом, как бы он назывался?"
        value={closure.movieOrBookTitle}
        onChange={(v) => updateClosure({ movieOrBookTitle: v })}
        placeholder="Название..."
        singleLine
      />

      <TextArea
        label={`Напиши прощальное послание ${year} году`}
        value={closure.goodbyeMessage}
        onChange={(v) => updateClosure({ goodbyeMessage: v })}
        placeholder={`Дорогой ${year}...`}
        minRows={6}
      />
    </div>
  );
}
