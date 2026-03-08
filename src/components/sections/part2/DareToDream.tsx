import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';
import { PhotoUpload } from '../../ui/PhotoUpload';
import { usePhotoManager } from '../../../hooks/usePhotoManager';

export function DareToDream() {
  const text = useYearCompassStore(s => s.data.dareToDream.text);
  const photoIds = useYearCompassStore(s => s.data.dareToDream.photoIds);
  const allPhotos = useYearCompassStore(s => s.photos);
  const update = useYearCompassStore(s => s.updateDareToDream);
  const nextYear = useYearCompassStore(s => s.data.year + 1);

  const sectionPhotos = allPhotos.filter(p => photoIds.includes(p.id));
  const { addPhoto, removePhoto, updateCaption } = usePhotoManager('dareToDream');

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Мечтай без ограничений"
        subtitle={`Представь идеальный ${nextYear} год. Что делаешь? Где ты? Кто рядом?`}
      />

      <TextArea
        value={text}
        onChange={(v) => update({ text: v })}
        placeholder="Пиши без цензуры. Позволь себе мечтать по-крупному..."
        minRows={8}
      />

      <div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--tg-text)' }}>
          🖼️ Картинки твоей мечты (vision board)
        </p>
        <PhotoUpload
          photos={sectionPhotos}
          onAdd={addPhoto}
          onRemove={removePhoto}
          onCaptionChange={updateCaption}
        />
      </div>
    </div>
  );
}
