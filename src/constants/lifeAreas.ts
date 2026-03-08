import type { LifeAreaKey } from '../types/yearCompass';

export interface LifeAreaDefinition {
  key: LifeAreaKey;
  label: string;
  emoji: string;
  color: string;
}

export const LIFE_AREAS: LifeAreaDefinition[] = [
  { key: 'personalFamily',       label: 'Личная жизнь и семья',    emoji: '🏠', color: '#fecdd3' },
  { key: 'careerStudies',        label: 'Карьера и учёба',          emoji: '💼', color: '#bfdbfe' },
  { key: 'friendsCommunity',     label: 'Друзья и общество',        emoji: '🤝', color: '#bbf7d0' },
  { key: 'relaxationCreativity', label: 'Отдых и творчество',       emoji: '🎨', color: '#e9d5ff' },
  { key: 'physicalHealth',       label: 'Физическое здоровье',      emoji: '🏃', color: '#fed7aa' },
  { key: 'mentalHealth',         label: 'Психическое здоровье',     emoji: '🧘', color: '#99f6e4' },
  { key: 'habits',               label: 'Привычки',                 emoji: '✅', color: '#fef08a' },
  { key: 'betterTomorrow',       label: 'Лучшее будущее',           emoji: '🌱', color: '#a7f3d0' },
];

export const MAGICAL_TRIPLET_LABELS: string[] = [
  'Три вещи, которые я хочу достичь',
  'Три места, которые хочу посетить',
  'Три привычки, которые хочу выработать',
  'Три навыка, которые хочу освоить',
  'Три книги, которые хочу прочитать',
  'Три человека, с которыми хочу проводить больше времени',
  'Три способа улучшить здоровье',
  'Три опыта, которые хочу получить',
  'Три вещи, от которых хочу отказаться',
  'Три творческих проекта',
  'Три способа помочь другим',
  'Три вещи, за которые благодарен',
];

export const SIX_SENTENCES_PROMPTS: string[] = [
  'В этом году я наконец...',
  'В этом году я перестану...',
  'В этом году я стану более...',
  'В этом году я стану менее...',
  'В этом году я достигну...',
  'Моё слово на этот год — ..., потому что...',
];
