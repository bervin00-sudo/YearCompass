import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TripletInput } from '../../ui/TripletInput';

export function MagicalTriplets() {
  const triplets = useYearCompassStore(s => s.data.magicalTriplets.triplets);
  const updateItem = useYearCompassStore(s => s.updateMagicalTripletItem);

  return (
    <div className="flex flex-col gap-6 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Магические тройки"
        subtitle="По три самых важных вещи в каждой категории"
      />
      {triplets.map((triplet, i) => (
        <TripletInput
          key={i}
          label={triplet.label}
          values={triplet.items}
          onChange={(j, v) => updateItem(i, j, v)}
        />
      ))}
    </div>
  );
}
