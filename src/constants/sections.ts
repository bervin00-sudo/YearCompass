export interface SectionDefinition {
  id: string;
  title: string;
  subtitle: string;
  part: 1 | 2;
  order: number;
  hasPhotos: boolean;
}

export const SECTIONS: SectionDefinition[] = [
  // Part 1
  {
    id: 'calendarReview',
    title: 'Твой год по месяцам',
    subtitle: 'Пройдись по каждому месяцу и вспомни главное',
    part: 1,
    order: 0,
    hasPhotos: false,
  },
  {
    id: 'lifeAreasAssessment',
    title: 'Сферы жизни',
    subtitle: 'Как прошёл год в каждой области',
    part: 1,
    order: 1,
    hasPhotos: false,
  },
  {
    id: 'sixReflectionPrompts',
    title: 'Шесть итогов',
    subtitle: 'Ключевые моменты, которые сформировали твой год',
    part: 1,
    order: 2,
    hasPhotos: false,
  },
  {
    id: 'sixQuestions',
    title: 'Шесть вопросов',
    subtitle: 'Честный взгляд на прошедший год',
    part: 1,
    order: 3,
    hasPhotos: false,
  },
  {
    id: 'bestMoments',
    title: 'Лучшие моменты',
    subtitle: 'Воспоминания, которые стоит сохранить навсегда',
    part: 1,
    order: 4,
    hasPhotos: true,
  },
  {
    id: 'accomplishmentsChallenges',
    title: 'Достижения и испытания',
    subtitle: 'Что ты преодолел и чего добился',
    part: 1,
    order: 5,
    hasPhotos: false,
  },
  {
    id: 'forgiveness',
    title: 'Прощение',
    subtitle: 'Отпусти обиды — свои и чужие',
    part: 1,
    order: 6,
    hasPhotos: false,
  },
  {
    id: 'lettingGo',
    title: 'Отпустить',
    subtitle: 'Что ты оставляешь в уходящем году',
    part: 1,
    order: 7,
    hasPhotos: false,
  },
  {
    id: 'closure',
    title: 'Прощание с годом',
    subtitle: 'Завершение и точка',
    part: 1,
    order: 8,
    hasPhotos: false,
  },
  // Part 2
  {
    id: 'dareToDream',
    title: 'Мечтай без ограничений',
    subtitle: 'Каким будет идеальный следующий год?',
    part: 2,
    order: 9,
    hasPhotos: true,
  },
  {
    id: 'lifeAreasGoals',
    title: 'Цели по сферам',
    subtitle: 'Намерения для каждой области жизни',
    part: 2,
    order: 10,
    hasPhotos: false,
  },
  {
    id: 'magicalTriplets',
    title: 'Магические тройки',
    subtitle: 'По три самых важных вещи',
    part: 2,
    order: 11,
    hasPhotos: false,
  },
  {
    id: 'sixSentences',
    title: 'Шесть предложений',
    subtitle: 'Курс на следующий год',
    part: 2,
    order: 12,
    hasPhotos: false,
  },
  {
    id: 'wordForYear',
    title: 'Слово года',
    subtitle: 'Одно слово, которое будет вести тебя',
    part: 2,
    order: 13,
    hasPhotos: false,
  },
  {
    id: 'secretWish',
    title: 'Тайное желание',
    subtitle: 'То, о чём ты пока не говоришь вслух',
    part: 2,
    order: 14,
    hasPhotos: false,
  },
];

export const TOTAL_SECTIONS = SECTIONS.length;
