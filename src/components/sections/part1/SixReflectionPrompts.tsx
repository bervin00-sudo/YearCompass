import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

const PROMPTS = [
  { key: 'wisestDecision', label: '🧠 Самое мудрое решение, которое я принял(а)' },
  { key: 'biggestLesson', label: '📚 Главный урок, который я вынес(ла)' },
  { key: 'biggestCompletion', label: '✅ Самое крупное дело, которое я завершил(а)' },
  { key: 'mostImportantForOthers', label: '🤝 Самое важное, что я сделал(а) для других' },
  { key: 'biggestSurprise', label: '😲 Самая большая неожиданность года' },
  { key: 'biggestRisk', label: '🎲 Самый большой риск, который я взял(а) на себя' },
] as const;

type Key = typeof PROMPTS[number]['key'];

export function SixReflectionPrompts() {
  const prompts = useYearCompassStore(s => s.data.sixReflectionPrompts);
  const update = useYearCompassStore(s => s.updateSixReflectionPrompts);

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Шесть итогов"
        subtitle="Ключевые моменты, которые сформировали твой год"
      />
      {PROMPTS.map(({ key, label }) => (
        <TextArea
          key={key}
          label={label}
          value={prompts[key as Key]}
          onChange={(v) => update({ [key]: v })}
          placeholder="Напиши..."
          minRows={2}
        />
      ))}
    </div>
  );
}
