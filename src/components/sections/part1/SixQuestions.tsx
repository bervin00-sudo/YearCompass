import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { TextArea } from '../../ui/TextArea';
import { TripletInput } from '../../ui/TripletInput';

export function SixQuestions() {
  const q = useYearCompassStore(s => s.data.sixQuestions);
  const update = useYearCompassStore(s => s.updateSixQuestions);

  return (
    <div className="flex flex-col gap-5 px-4 pb-24">
      <SectionHeader
        part={1}
        title="Шесть вопросов"
        subtitle="Честный взгляд на прошедший год"
      />

      <TextArea
        label="🙏 За что ты больше всего благодарен(а) в этом году?"
        value={q.gratefulFor}
        onChange={(v) => update({ gratefulFor: v })}
        placeholder="Напиши..."
        minRows={2}
      />

      <TextArea
        label="💡 Что лучшего ты открыл(а) в себе?"
        value={q.bestDiscoveredAboutSelf}
        onChange={(v) => update({ bestDiscoveredAboutSelf: v })}
        placeholder="Напиши..."
        minRows={2}
      />

      <TextArea
        label="😔 Что тебе не удалось сделать в этом году?"
        value={q.notAccomplished}
        onChange={(v) => update({ notAccomplished: v })}
        placeholder="Напиши..."
        minRows={2}
      />

      <TripletInput
        label="🌟 Три человека, на которых ты повлиял(а) больше всего"
        values={q.threeYouInfluenced}
        onChange={(i, v) => update({ threeYouInfluenced: q.threeYouInfluenced.map((x, j) => j === i ? v : x) as [string,string,string] })}
        placeholder="Имя или описание"
      />

      <TripletInput
        label="🙌 Три человека, которые больше всего повлияли на тебя"
        values={q.threeWhoInfluencedYou}
        onChange={(i, v) => update({ threeWhoInfluencedYou: q.threeWhoInfluencedYou.map((x, j) => j === i ? v : x) as [string,string,string] })}
        placeholder="Имя или описание"
      />

      <TextArea
        label="🏅 Чем ты больше всего гордишься в этом году?"
        value={q.mostProudOf}
        onChange={(v) => update({ mostProudOf: v })}
        placeholder="Напиши..."
        minRows={2}
      />
    </div>
  );
}
