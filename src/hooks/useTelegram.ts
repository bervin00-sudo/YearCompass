import { useEffect } from 'react';

// Telegram WebApp SDK is loaded via script tag in index.html
// This provides a type-safe wrapper with fallbacks for desktop development

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  colorScheme: 'light' | 'dark';
  themeParams: TelegramThemeParams;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setParams: (params: { color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) => void;
  };
  BackButton: {
    isVisible: boolean;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  openLink: (url: string) => void;
  safeAreaInset?: { top: number; bottom: number; left: number; right: number };
  platform?: string;
}

// Fallback WebApp object for desktop development
const mockWebApp: TelegramWebApp = {
  ready: () => {},
  expand: () => {},
  close: () => {},
  colorScheme: 'light',
  themeParams: {
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    link_color: '#2481cc',
    button_color: '#2481cc',
    button_text_color: '#ffffff',
    secondary_bg_color: '#f0f0f0',
  },
  MainButton: {
    text: '',
    color: '#2481cc',
    textColor: '#ffffff',
    isVisible: false,
    isActive: true,
    setText: () => {},
    onClick: () => {},
    offClick: () => {},
    show: () => {},
    hide: () => {},
    enable: () => {},
    disable: () => {},
    showProgress: () => {},
    hideProgress: () => {},
    setParams: () => {},
  },
  BackButton: {
    isVisible: false,
    onClick: () => {},
    offClick: () => {},
    show: () => {},
    hide: () => {},
  },
  HapticFeedback: {
    impactOccurred: () => {},
    notificationOccurred: () => {},
    selectionChanged: () => {},
  },
  openLink: (url) => { window.open(url, '_blank'); },
};

export function getTelegramWebApp(): TelegramWebApp {
  return window.Telegram?.WebApp ?? mockWebApp;
}

export function useTelegram() {
  const tg = getTelegramWebApp();

  useEffect(() => {
    tg.ready();
    tg.expand();

    // Inject theme CSS variables
    const params = tg.themeParams;
    const root = document.documentElement;
    if (params.bg_color) root.style.setProperty('--tg-bg', params.bg_color);
    if (params.text_color) root.style.setProperty('--tg-text', params.text_color);
    if (params.hint_color) root.style.setProperty('--tg-hint', params.hint_color);
    if (params.link_color) root.style.setProperty('--tg-link', params.link_color);
    if (params.button_color) root.style.setProperty('--tg-button', params.button_color);
    if (params.button_text_color) root.style.setProperty('--tg-button-text', params.button_text_color);
    if (params.secondary_bg_color) root.style.setProperty('--tg-secondary-bg', params.secondary_bg_color);

    // Dark mode
    if (tg.colorScheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [tg]);

  return {
    tg,
    colorScheme: tg.colorScheme,
    themeParams: tg.themeParams,
    haptic: tg.HapticFeedback,
  };
}
