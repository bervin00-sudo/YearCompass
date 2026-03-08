import { type ReactNode } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useYearCompassStore } from '../../store/yearCompassStore';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  useTelegram(); // initializes theme vars

  const isSaving = useYearCompassStore(s => s.isSaving);

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'var(--tg-bg)', color: 'var(--tg-text)' }}
    >
      {/* Saving indicator */}
      {isSaving && (
        <div
          className="fixed top-2 right-3 text-xs px-2 py-1 rounded-full z-50"
          style={{ background: 'var(--tg-secondary-bg)', color: 'var(--tg-hint)' }}
        >
          Сохранение…
        </div>
      )}
      {children}
    </div>
  );
}
