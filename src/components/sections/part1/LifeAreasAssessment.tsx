import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { RatingSlider } from '../../ui/RatingSlider';
import { LIFE_AREAS } from '../../../constants/lifeAreas';
import type { LifeAreaKey } from '../../../types/yearCompass';

export function LifeAreasAssessment() {
  const ratings = useYearCompassStore(s => s.data.lifeAreasAssessment.ratings);
  const updateRating = useYearCompassStore(s => s.updateLifeAreaRating);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Сферы жизни"
        subtitle="Оцени каждую область по шкале 1–10 и напиши, что произошло"
      />
      {LIFE_AREAS.map((area) => {
        const ratingData = ratings.find(r => r.area === area.key);
        return (
          <RatingSlider
            key={area.key}
            label={area.label}
            emoji={area.emoji}
            color={area.color}
            value={ratingData?.rating ?? 5}
            note={ratingData?.note ?? ''}
            onRatingChange={(v) => updateRating(area.key as LifeAreaKey, v, ratingData?.note ?? '')}
            onNoteChange={(n) => updateRating(area.key as LifeAreaKey, ratingData?.rating ?? 5, n)}
          />
        );
      })}
    </div>
  );
}
