import { AnimatePresence, motion } from 'framer-motion';
import { useYearCompassStore } from './store/yearCompassStore';
import { AppShell } from './components/layout/AppShell';
import { WelcomePage } from './pages/WelcomePage';
import { WizardPage } from './pages/WizardPage';
import { ExportPage } from './pages/ExportPage';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function App() {
  const page = useYearCompassStore(s => s.page);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {page === 'welcome' && <WelcomePage />}
          {page === 'wizard' && <WizardPage />}
          {page === 'export' && <ExportPage />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
