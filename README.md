# Year Compass — Telegram Mini App

Telegram Mini App для подведения итогов года по методологии [YearCompass](https://yearcompass.com).

## Что умеет

- 15 разделов рефлексии и планирования
- Прикрепление фото к разделам с подписями
- Автосохранение в IndexedDB (данные только на устройстве)
- Поддержка нескольких лет
- Экспорт:
  - **ZIP для Obsidian** — `YearCompass-YYYY.md` + папка `images/`
  - **Единый Markdown** — `.md` с фото в base64
  - **Коллаж** — красивый JPEG из всех фото с подписями

## Запуск для разработки

```bash
npm install
npm run dev
```

Открой `http://localhost:5173` — работает без Telegram (есть fallback).

## Деплой в Telegram

### 1. Сборка

```bash
npm run build
```

### 2. Хостинг

**Cloudflare Pages (рекомендуется):**
- Push на GitHub
- Подключи репозиторий на [pages.cloudflare.com](https://pages.cloudflare.com)
- Build command: `npm run build`, Output directory: `dist`
- Получишь бесплатный HTTPS URL вида `xxx.pages.dev`

**Vercel:**
```bash
npx vercel --prod
```

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
# Добавь в package.json: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

### 3. Регистрация в Telegram

1. Открой `@BotFather`
2. `/newbot` — создай бота
3. `/newapp` — выбери бота, вставь HTTPS URL деплоя

### Тест через ngrok

```bash
npm run dev
npx ngrok http 5173
# HTTPS URL от ngrok → BotFather
```

## Структура

```
src/
├── types/yearCompass.ts     # TypeScript типы всех данных
├── constants/               # Разделы, сферы жизни, промпты
├── store/                   # Zustand + Immer
├── hooks/                   # useStorage, useTelegram, useAutoSave, usePhotoManager
├── utils/                   # exportMarkdown, exportZip, exportCollage
├── components/
│   ├── layout/              # AppShell, ProgressBar, SectionHeader
│   ├── ui/                  # TextArea, RatingSlider, PhotoUpload, TripletInput
│   └── sections/part1-2/   # 15 разделов YearCompass
└── pages/                   # WelcomePage, WizardPage, ExportPage
```

## Стек

React 18 · TypeScript · Vite · Tailwind CSS · Zustand · IndexedDB · JSZip · Framer Motion · @twa-dev/sdk
