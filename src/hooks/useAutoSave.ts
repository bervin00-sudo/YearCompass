import { useEffect, useRef } from 'react';
import { useYearCompassStore } from '../store/yearCompassStore';
import { saveCompassData } from './useStorage';

const DEBOUNCE_MS = 500;

export function useAutoSave() {
  const data = useYearCompassStore(s => s.data);
  const hasUnsavedChanges = useYearCompassStore(s => s.hasUnsavedChanges);
  const currentSectionIndex = useYearCompassStore(s => s.currentSectionIndex);
  const markSaved = useYearCompassStore(s => s.markSaved);
  const setSaving = useYearCompassStore(s => s.setSaving);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save section index to localStorage whenever it changes
  useEffect(() => {
    if (data.year) {
      localStorage.setItem(`yc-section-${data.year}`, String(currentSectionIndex));
    }
  }, [currentSectionIndex, data.year]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        await saveCompassData(data);
        markSaved();
      } catch (err) {
        console.error('Auto-save failed:', err);
      } finally {
        setSaving(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, hasUnsavedChanges, markSaved, setSaving]);
}
