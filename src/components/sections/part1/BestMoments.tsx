import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';
import { PhotoUpload } from '../../ui/PhotoUpload';
import { usePhotoManager } from '../../../hooks/usePhotoManager';

export function BestMoments() {
  const moments = useYearCompassStore(s => s.data.bestMoments.moments);
  const photoIds = useYearCompassStore(s => s.data.bestMoments.photoIds);
  const allPhotos = useYearCompassStore(s => s.photos);
  const update = useYearCompassStore(s => s.updateBestMoments);

  const sectionPhotos = allPhotos.filter(p => photoIds.includes(p.id));
  const { addPhoto, removePhoto, updateCaption } = usePhotoManager('bestMoments');

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Лучшие моменты"
        subtitle="Опиши незабываемые, радостные мгновения года"
      />

      <TextArea
        label="📝 Опиши лучшие моменты"
        value={moments}
        onChange={(v) => update({ moments: v })}
        placeholder="Что происходило? Кто был рядом? Как ты себя чувствовал(а)?"
        minRows={5}
      />

      <div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--tg-text)' }}>
          📸 Фотографии лучших моментов
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
