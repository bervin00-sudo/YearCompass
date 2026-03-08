import { useEffect, useRef } from 'react';
import { useYearCompassStore } from '../store/yearCompassStore';
import { saveCompassData } from './useStorage';

const DEBOUNCE_MS = 1500;

export function useAutoSave() {
  const data = useYearCompassStore(s => s.data);
  const hasUnsavedChanges = useYearCompassStore(s => s.hasUnsavedChanges);
  const markSaved = useYearCompassStore(s => s.markSaved);
  const setSaving = useYearCompassStore(s => s.setSaving);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
