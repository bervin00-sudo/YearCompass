import type { YearCompassData } from '../types/yearCompass';
import { LIFE_AREAS } from '../constants/lifeAreas';
import { MAGICAL_TRIPLET_LABELS, SIX_SENTENCES_PROMPTS } from '../constants/lifeAreas';

export function createInitialData(year: number): YearCompassData {
  const now = Date.now();
  return {
    year,
    createdAt: now,
    updatedAt: now,

    calendarReview: {
      monthNotes: Array.from({ length: 12 }, (_, i) => ({ month: i, note: '', photoIds: [] })),
      overallNote: '',
    },

    lifeAreasAssessment: {
      ratings: LIFE_AREAS.map(a => ({ area: a.key, rating: 5, note: '' })),
    },

    sixReflectionPrompts: {
      wisestDecision: '',
      biggestLesson: '',
      biggestCompletion: '',
      mostImportantForOthers: '',
      biggestSurprise: '',
      biggestRisk: '',
    },

    sixQuestions: {
      gratefulFor: '',
      bestDiscoveredAboutSelf: '',
      notAccomplished: '',
      threeYouInfluenced: ['', '', ''],
      threeWhoInfluencedYou: ['', '', ''],
      mostProudOf: '',
    },

    bestMoments: {
      moments: '',
      photoIds: [],
    },

    accomplishmentsChallenges: {
      accomplishments: ['', '', ''],
      challenges: ['', '', ''],
    },

    forgiveness: { text: '' },
    lettingGo: { text: '' },

    closure: {
      threeWords: ['', '', ''],
      movieOrBookTitle: '',
      goodbyeMessage: '',
    },

    dareToDream: {
      text: '',
      photoIds: [],
    },

    lifeAreasGoals: {
      goals: LIFE_AREAS.map(a => ({ area: a.key, goal: '', steps: '' })),
    },

    magicalTriplets: {
      triplets: MAGICAL_TRIPLET_LABELS.map(label => ({
        label,
        items: ['', '', ''] as [string, string, string],
      })),
    },

    sixSentences: {
      sentences: SIX_SENTENCES_PROMPTS.map(prompt => ({ prompt, answer: '' })),
    },

    wordForYear: { word: '', why: '' },
    secretWish: { wish: '' },
  };
}
