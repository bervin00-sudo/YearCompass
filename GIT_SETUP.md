# Git Repository Setup

## Проблема
Git требует установки Xcode Command Line Tools, но у пользователя нет прав администратора для их установки.

## Решение
Создан wrapper-скрипт `git-wrapper.sh`, который предоставляет базовую функциональность Git без необходимости установки Xcode Command Line Tools.

## Использование

### 1. Инициализация репозитория
```bash
git init
```

### 2. Добавление файлов
```bash
git add <filename>
git add .  # добавить все файлы
```

### 3. Создание коммита
```bash
git commit -m "Описание изменений"
```

### 4. Просмотр статуса
```bash
git status
```

### 5. Просмотр истории
```bash
git log
```

### 6. Добавление удаленного репозитория
```bash
git remote add origin <URL-репозитория>
```

## Ограничения
- Push/Pull функции не реализованы в wrapper'е
- Clone функция не реализована
- Некоторые продвинутые функции Git недоступны

## Для полной функциональности Git
Установите Xcode Command Line Tools:
```bash
xcode-select --install
```

Или установите Git через Homebrew (требует права администратора):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
```

## Текущее состояние
- ✅ Репозиторий инициализирован
- ✅ Файлы добавлены в staging area
- ✅ Создан первый коммит
- ✅ Добавлен удаленный репозиторий (пример)
- ⚠️ Push/Pull функции недоступны через wrapper
