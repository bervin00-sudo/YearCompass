import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

export function LettingGo() {
  const text = useYearCompassStore(s => s.data.lettingGo.text);
  const update = useYearCompassStore(s => s.updateLettingGo);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Отпустить"
        subtitle="Что из прошедшего года ты хочешь оставить позади? Что больше не нужно нести с собой?"
      />
      <TextArea
        value={text}
        onChange={update}
        placeholder="Напиши всё, что хочешь отпустить..."
        minRows={8}
      />
    </div>
  );
}
