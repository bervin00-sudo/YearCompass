import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  YearCompassData,
  Photo,
  LifeAreaKey,
  AppPage,
  SixReflectionPromptsData,
  SixQuestionsData,
  BestMomentsData,
  AccomplishmentsChallengesData,
  ClosureData,
  DareToDreamData,
  WordForYearData,
} from '../types/yearCompass';
import { TOTAL_SECTIONS } from '../constants/sections';
import { createInitialData } from './initialData';

interface YearCompassStore {
  // State
  data: YearCompassData;
  photos: Photo[];
  currentSectionIndex: number;
  page: AppPage;
  isLoading: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;

  // Navigation
  setPage: (page: AppPage) => void;
  goToSection: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;

  // Part 1 updates
  updateMonthNote: (month: number, note: string) => void;
  updateMonthPhotoIds: (month: number, photoIds: string[]) => void;
  updateCalendarOverallNote: (note: string) => void;
  updateLifeAreaRating: (area: LifeAreaKey, rating: number, note: string) => void;
  updateSixReflectionPrompts: (patch: Partial<SixReflectionPromptsData>) => void;
  updateSixQuestions: (patch: Partial<SixQuestionsData>) => void;
  updateBestMoments: (patch: Partial<BestMomentsData>) => void;
  updateAccomplishment: (index: number, value: string) => void;
  updateChallenge: (index: number, value: string) => void;
  updateForgiveness: (text: string) => void;
  updateLettingGo: (text: string) => void;
  updateClosure: (patch: Partial<ClosureData>) => void;
  updateClosureWord: (index: number, value: string) => void;

  // Part 2 updates
  updateDareToDream: (patch: Partial<DareToDreamData>) => void;
  updateLifeAreaGoal: (area: LifeAreaKey, field: 'goal' | 'steps', value: string) => void;
  updateMagicalTripletItem: (tripletIndex: number, itemIndex: number, value: string) => void;
  updateSixSentence: (index: number, answer: string) => void;
  updateWordForYear: (patch: Partial<WordForYearData>) => void;
  updateSecretWish: (wish: string) => void;

  // Photos
  addPhoto: (photo: Photo) => void;
  removePhoto: (photoId: string) => void;
  updatePhotoCaption: (photoId: string, caption: string) => void;

  // Lifecycle
  loadData: (data: YearCompassData, photos: Photo[]) => void;
  resetForYear: (year: number) => void;
  markSaved: () => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
}

export const useYearCompassStore = create<YearCompassStore>()(
  immer((set) => ({
    data: createInitialData(new Date().getFullYear()),
    photos: [],
    currentSectionIndex: 0,
    page: 'welcome',
    isLoading: false,
    isSaving: false,
    hasUnsavedChanges: false,

    setPage: (page) => set((s) => { s.page = page; }),

    goToSection: (index) => set((s) => {
      s.currentSectionIndex = Math.max(0, Math.min(index, TOTAL_SECTIONS - 1));
    }),

    goNext: () => set((s) => {
      if (s.currentSectionIndex < TOTAL_SECTIONS - 1) {
        s.currentSectionIndex += 1;
      }
    }),

    goPrev: () => set((s) => {
      if (s.currentSectionIndex > 0) {
        s.currentSectionIndex -= 1;
      }
    }),

    // ── Part 1 ──────────────────────────────────────────────────────────────

    updateMonthNote: (month, note) => set((s) => {
      const entry = s.data.calendarReview.monthNotes.find(m => m.month === month);
      if (entry) entry.note = note;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateMonthPhotoIds: (month, photoIds) => set((s) => {
      const entry = s.data.calendarReview.monthNotes.find(m => m.month === month);
      if (entry) entry.photoIds = photoIds;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateCalendarOverallNote: (note) => set((s) => {
      s.data.calendarReview.overallNote = note;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateLifeAreaRating: (area, rating, note) => set((s) => {
      const entry = s.data.lifeAreasAssessment.ratings.find(r => r.area === area);
      if (entry) { entry.rating = rating; entry.note = note; }
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateSixReflectionPrompts: (patch) => set((s) => {
      Object.assign(s.data.sixReflectionPrompts, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateSixQuestions: (patch) => set((s) => {
      Object.assign(s.data.sixQuestions, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateBestMoments: (patch) => set((s) => {
      Object.assign(s.data.bestMoments, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateAccomplishment: (index, value) => set((s) => {
      s.data.accomplishmentsChallenges.accomplishments[index] = value;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateChallenge: (index, value) => set((s) => {
      s.data.accomplishmentsChallenges.challenges[index] = value;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateForgiveness: (text) => set((s) => {
      s.data.forgiveness.text = text;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateLettingGo: (text) => set((s) => {
      s.data.lettingGo.text = text;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateClosure: (patch) => set((s) => {
      Object.assign(s.data.closure, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateClosureWord: (index, value) => set((s) => {
      s.data.closure.threeWords[index] = value;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    // ── Part 2 ──────────────────────────────────────────────────────────────

    updateDareToDream: (patch) => set((s) => {
      Object.assign(s.data.dareToDream, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateLifeAreaGoal: (area, field, value) => set((s) => {
      const entry = s.data.lifeAreasGoals.goals.find(g => g.area === area);
      if (entry) entry[field] = value;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateMagicalTripletItem: (tripletIndex, itemIndex, value) => set((s) => {
      s.data.magicalTriplets.triplets[tripletIndex].items[itemIndex] = value;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateSixSentence: (index, answer) => set((s) => {
      s.data.sixSentences.sentences[index].answer = answer;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateWordForYear: (patch) => set((s) => {
      Object.assign(s.data.wordForYear, patch);
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    updateSecretWish: (wish) => set((s) => {
      s.data.secretWish.wish = wish;
      s.data.updatedAt = Date.now();
      s.hasUnsavedChanges = true;
    }),

    // ── Photos ──────────────────────────────────────────────────────────────

    addPhoto: (photo) => set((s) => {
      s.photos.push(photo);
      s.hasUnsavedChanges = true;
    }),

    removePhoto: (photoId) => set((s) => {
      s.photos = s.photos.filter(p => p.id !== photoId);
      // Remove from section photoIds
      s.data.bestMoments.photoIds = s.data.bestMoments.photoIds.filter(id => id !== photoId);
      s.data.dareToDream.photoIds = s.data.dareToDream.photoIds.filter(id => id !== photoId);
      s.data.calendarReview.monthNotes.forEach(mn => {
        mn.photoIds = mn.photoIds.filter(id => id !== photoId);
      });
      s.hasUnsavedChanges = true;
    }),

    updatePhotoCaption: (photoId, caption) => set((s) => {
      const photo = s.photos.find(p => p.id === photoId);
      if (photo) photo.caption = caption;
      s.hasUnsavedChanges = true;
    }),

    // ── Lifecycle ───────────────────────────────────────────────────────────

    loadData: (data, photos) => set((s) => {
      s.data = data;
      s.photos = photos;
      s.hasUnsavedChanges = false;
    }),

    resetForYear: (year) => set((s) => {
      s.data = createInitialData(year);
      s.photos = [];
      s.currentSectionIndex = 0;
      s.hasUnsavedChanges = false;
    }),

    markSaved: () => set((s) => { s.hasUnsavedChanges = false; }),
    setLoading: (loading) => set((s) => { s.isLoading = loading; }),
    setSaving: (saving) => set((s) => { s.isSaving = saving; }),
  }))
);
