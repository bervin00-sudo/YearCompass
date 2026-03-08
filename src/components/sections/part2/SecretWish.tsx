import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';

export function SecretWish() {
  const wish = useYearCompassStore(s => s.data.secretWish.wish);
  const update = useYearCompassStore(s => s.updateSecretWish);

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Тайное желание"
        subtitle="Позволь себе помечтать о самом сокровенном. Что ты действительно хочешь?"
      />

      <div
        className="rounded-2xl p-4 text-center"
        style={{ background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)' }}
      >
        <span className="text-4xl">✨</span>
        <p className="text-sm mt-2" style={{ color: 'var(--tg-hint)' }}>
          Это только твоё. Пиши честно.
        </p>
      </div>

      <TextArea
        value={wish}
        onChange={update}
        placeholder="Моё самое заветное желание на этот год..."
        minRows={6}
      />
    </div>
  );
}
