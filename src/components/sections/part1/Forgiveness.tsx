import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

export function Forgiveness() {
  const text = useYearCompassStore(s => s.data.forgiveness.text);
  const update = useYearCompassStore(s => s.updateForgiveness);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Прощение"
        subtitle="Есть ли кто-то — включая тебя самого — кому ты должен простить? Что нужно отпустить?"
      />
      <TextArea
        value={text}
        onChange={update}
        placeholder="Напиши о прощении. Это только для тебя..."
        minRows={8}
      />
    </div>
  );
}
