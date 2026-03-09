import { type FC, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useYearCompassStore } from '../store/yearCompassStore';
import { useAutoSave } from '../hooks/useAutoSave';
import { getTelegramWebApp } from '../hooks/useTelegram';
import { SECTIONS, TOTAL_SECTIONS } from '../constants/sections';
import { ProgressBar } from '../components/layout/ProgressBar';

// Part 1
import { CalendarReview } from '../components/sections/part1/CalendarReview';
import { LifeAreasAssessment } from '../components/sections/part1/LifeAreasAssessment';
import { SixReflectionPrompts } from '../components/sections/part1/SixReflectionPrompts';
import { SixQuestions } from '../components/sections/part1/SixQuestions';
import { BestMoments } from '../components/sections/part1/BestMoments';
import { AccomplishmentsChallenges } from '../components/sections/part1/AccomplishmentsChallenges';
import { Forgiveness } from '../components/sections/part1/Forgiveness';
import { LettingGo } from '../components/sections/part1/LettingGo';
import { Closure } from '../components/sections/part1/Closure';
// Part 2
import { DareToDream } from '../components/sections/part2/DareToDream';
import { LifeAreasGoals } from '../components/sections/part2/LifeAreasGoals';
import { MagicalTriplets } from '../components/sections/part2/MagicalTriplets';
import { SixSentences } from '../components/sections/part2/SixSentences';
import { WordForYear } from '../components/sections/part2/WordForYear';
import { SecretWish } from '../components/sections/part2/SecretWish';

const SECTION_COMPONENTS: Record<string, FC> = {
  calendarReview: CalendarReview,
  lifeAreasAssessment: LifeAreasAssessment,
  sixReflectionPrompts: SixReflectionPrompts,
  sixQuestions: SixQuestions,
  bestMoments: BestMoments,
  accomplishmentsChallenges: AccomplishmentsChallenges,
  forgiveness: Forgiveness,
  lettingGo: LettingGo,
  closure: Closure,
  dareToDream: DareToDream,
  lifeAreasGoals: LifeAreasGoals,
  magicalTriplets: MagicalTriplets,
  sixSentences: SixSentences,
  wordForYear: WordForYear,
  secretWish: SecretWish,
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export function WizardPage() {
  useAutoSave();

  const currentIndex = useYearCompassStore(s => s.currentSectionIndex);
  const goNext = useYearCompassStore(s => s.goNext);
  const goPrev = useYearCompassStore(s => s.goPrev);
  const setPage = useYearCompassStore(s => s.setPage);

  const directionRef = useRef(1);
  const prevIndexRef = useRef(currentIndex);
  const mainCallbackRef = useRef<(() => void) | null>(null);

  const section = SECTIONS[currentIndex];
  const SectionComponent = SECTION_COMPONENTS[section.id];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === TOTAL_SECTIONS - 1;

  // Determine animation direction
  if (currentIndex !== prevIndexRef.current) {
    directionRef.current = currentIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = currentIndex;
  }

  // Telegram MainButton + BackButton
  useEffect(() => {
    const tg = getTelegramWebApp();

    // Back button
    if (isFirst) {
      tg.BackButton.hide();
    } else {
      const onBack = () => {
        tg.HapticFeedback.impactOccurred('light');
        goPrev();
      };
      tg.BackButton.onClick(onBack);
      tg.BackButton.show();
      return () => {
        tg.BackButton.offClick(onBack);
      };
    }
  }, [isFirst, goPrev]);

  const onMain = useCallback(() => {
    const tg = getTelegramWebApp();
    tg.HapticFeedback.impactOccurred('medium');
    if (isLast) {
      setPage('export');
    } else {
      goNext();
    }
  }, [isLast, goNext, setPage]);

  useEffect(() => {
    const tg = getTelegramWebApp();

    // Remove previous handler before registering new one
    if (mainCallbackRef.current) {
      tg.MainButton.offClick(mainCallbackRef.current);
    }
    mainCallbackRef.current = onMain;

    tg.MainButton.setText(isLast ? '🎉 К экспорту' : 'Далее →');
    tg.MainButton.onClick(onMain);
    tg.MainButton.show();

    return () => {
      tg.MainButton.offClick(onMain);
      mainCallbackRef.current = null;
    };
  }, [isLast, onMain]);

  // Part transition indicator
  const currentPart = section.part;
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const showPartTransition = prevSection && prevSection.part !== currentPart;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Progress */}
      <ProgressBar current={currentIndex} total={TOTAL_SECTIONS} />

      {/* Part transition banner */}
      {showPartTransition && (
        <div
          className="mx-4 mb-2 px-4 py-2 rounded-xl text-center text-sm font-semibold"
          style={{ background: 'var(--tg-button)', color: 'var(--tg-button-text)' }}
        >
          🌅 Переходим к планированию следующего года
        </div>
      )}

      {/* Section content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={section.id}
            custom={directionRef.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {SectionComponent && <SectionComponent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile fallback nav (for non-Telegram / desktop) */}
      <div
        className="flex gap-2 px-4 py-3 border-t"
        style={{ borderColor: 'var(--tg-secondary-bg)' }}
      >
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-opacity"
          style={{
            background: 'var(--tg-secondary-bg)',
            color: 'var(--tg-text)',
            opacity: isFirst ? 0.3 : 1,
          }}
        >
          ← Назад
        </button>
        <button
          onClick={() => {
            if (isLast) setPage('export');
            else goNext();
          }}
          className="flex-2 flex-grow py-3 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--tg-button)', color: 'var(--tg-button-text)' }}
        >
          {isLast ? '🎉 К экспорту' : 'Далее →'}
        </button>
      </div>
    </div>
  );
}
