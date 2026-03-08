import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TripletInput } from '../../ui/TripletInput';

export function AccomplishmentsChallenges() {
  const acc = useYearCompassStore(s => s.data.accomplishmentsChallenges);
  const updateAcc = useYearCompassStore(s => s.updateAccomplishment);
  const updateChal = useYearCompassStore(s => s.updateChallenge);

  return (
    <div className="flex flex-col gap-6 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Достижения и испытания"
        subtitle="Три главных достижения и три главных испытания года"
      />

      <TripletInput
        label="🏆 Три главных достижения"
        values={acc.accomplishments}
        onChange={(i, v) => updateAcc(i, v)}
        placeholder="Достижение..."
      />

      <TripletInput
        label="⚡ Три главных испытания"
        values={acc.challenges}
        onChange={(i, v) => updateChal(i, v)}
        placeholder="Испытание..."
      />
    </div>
  );
}
