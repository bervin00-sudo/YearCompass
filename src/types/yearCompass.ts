export type LifeAreaKey =
  | 'personalFamily'
  | 'careerStudies'
  | 'friendsCommunity'
  | 'relaxationCreativity'
  | 'physicalHealth'
  | 'mentalHealth'
  | 'habits'
  | 'betterTomorrow';

export interface Photo {
  id: string;
  dataUrl: string;
  caption: string;
  sectionId: string;
  uploadedAt: number;
}

// ── Part 1 ────────────────────────────────────────────────────────────────────

export interface MonthNote {
  month: number; // 0–11
  note: string;
  photoIds: string[];
}

export interface CalendarReviewData {
  monthNotes: MonthNote[];
  overallNote: string;
}

export interface LifeAreaRating {
  area: LifeAreaKey;
  rating: number; // 1–10
  note: string;
}

export interface LifeAreasAssessmentData {
  ratings: LifeAreaRating[];
}

export interface SixReflectionPromptsData {
  wisestDecision: string;
  biggestLesson: string;
  biggestCompletion: string;
  mostImportantForOthers: string;
  biggestSurprise: string;
  biggestRisk: string;
}

export interface SixQuestionsData {
  gratefulFor: string;
  bestDiscoveredAboutSelf: string;
  notAccomplished: string;
  threeYouInfluenced: [string, string, string];
  threeWhoInfluencedYou: [string, string, string];
  mostProudOf: string;
}

export interface BestMomentsData {
  moments: string;
  photoIds: string[];
}

export interface AccomplishmentsChallengesData {
  accomplishments: [string, string, string];
  challenges: [string, string, string];
}

export interface ForgivenessData {
  text: string;
}

export interface LettingGoData {
  text: string;
}

export interface ClosureData {
  threeWords: [string, string, string];
  movieOrBookTitle: string;
  goodbyeMessage: string;
}

// ── Part 2 ────────────────────────────────────────────────────────────────────

export interface DareToDreamData {
  text: string;
  photoIds: string[];
}

export interface LifeAreaGoal {
  area: LifeAreaKey;
  goal: string;
  steps: string;
}

export interface LifeAreasGoalsData {
  goals: LifeAreaGoal[];
}

export interface MagicalTriplet {
  label: string;
  items: [string, string, string];
}

export interface MagicalTripletsData {
  triplets: MagicalTriplet[];
}

export interface SixSentencesData {
  sentences: { prompt: string; answer: string }[];
}

export interface WordForYearData {
  word: string;
  why: string;
}

export interface SecretWishData {
  wish: string;
}

// ── Root ──────────────────────────────────────────────────────────────────────

export interface YearCompassData {
  year: number;
  createdAt: number;
  updatedAt: number;

  // Part 1
  calendarReview: CalendarReviewData;
  lifeAreasAssessment: LifeAreasAssessmentData;
  sixReflectionPrompts: SixReflectionPromptsData;
  sixQuestions: SixQuestionsData;
  bestMoments: BestMomentsData;
  accomplishmentsChallenges: AccomplishmentsChallengesData;
  forgiveness: ForgivenessData;
  lettingGo: LettingGoData;
  closure: ClosureData;

  // Part 2
  dareToDream: DareToDreamData;
  lifeAreasGoals: LifeAreasGoalsData;
  magicalTriplets: MagicalTripletsData;
  sixSentences: SixSentencesData;
  wordForYear: WordForYearData;
  secretWish: SecretWishData;
}

export type AppPage = 'welcome' | 'wizard' | 'export';
