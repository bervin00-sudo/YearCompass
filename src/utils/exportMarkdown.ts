import type { YearCompassData, Photo } from '../types/yearCompass';
import { LIFE_AREAS } from '../constants/lifeAreas';

type ExportMode = 'obsidian-link' | 'base64';

function photoEmbed(photo: Photo, filenames: Record<string, string>, mode: ExportMode): string {
  if (mode === 'base64') {
    return `![${photo.caption || 'photo'}](${photo.dataUrl})`;
  }
  const fname = filenames[photo.id] ?? photo.id;
  return `![[images/${fname}]]`;
}

function photoBlock(photos: Photo[], filenames: Record<string, string>, mode: ExportMode): string {
  if (!photos.length) return '';
  return photos.map(p => {
    const embed = photoEmbed(p, filenames, mode);
    return p.caption ? `${embed}\n*${p.caption}*` : embed;
  }).join('\n\n');
}

export function buildMarkdownString(
  data: YearCompassData,
  photos: Photo[],
  filenames: Record<string, string>,
  mode: ExportMode
): string {
  const { year } = data;
  const nextYear = year + 1;
  const created = new Date(data.createdAt).toISOString().split('T')[0];

  const photosForSection = (sectionId: string) =>
    photos.filter(p => p.sectionId === sectionId);

  const lines: string[] = [];

  // Frontmatter
  lines.push('---');
  lines.push(`year: ${year}`);
  lines.push(`created: ${created}`);
  lines.push('tags:');
  lines.push('  - yearcompass');
  lines.push('  - reflection');
  lines.push('---');
  lines.push('');

  lines.push(`# Year Compass ${year}`);
  lines.push('');

  // ── PART 1 ────────────────────────────────────────────────────────────────

  lines.push(`## Часть 1: Итоги ${year} года`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Calendar Review
  lines.push('### 📅 Год по месяцам');
  lines.push('');
  const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  data.calendarReview.monthNotes.forEach(mn => {
    const monthPhotos = photos.filter(p => mn.photoIds.includes(p.id));
    if (!mn.note.trim() && !monthPhotos.length) return;
    lines.push(`> [!note] ${monthNames[mn.month]}`);
    if (mn.note.trim()) {
      lines.push(`> ${mn.note.replace(/\n/g, '\n> ')}`);
    }
    lines.push('');
    if (monthPhotos.length) {
      lines.push(photoBlock(monthPhotos, filenames, mode));
      lines.push('');
    }
  });
  if (data.calendarReview.overallNote.trim()) {
    lines.push('**Общее впечатление:**');
    lines.push('');
    lines.push(data.calendarReview.overallNote);
    lines.push('');
  }

  // Life Areas Assessment
  lines.push('### 🌐 Сферы жизни');
  lines.push('');
  lines.push('| Сфера | Оценка | Заметки |');
  lines.push('|-------|--------|---------|');
  data.lifeAreasAssessment.ratings.forEach(r => {
    const area = LIFE_AREAS.find(a => a.key === r.area);
    const label = area ? `${area.emoji} ${area.label}` : r.area;
    const note = r.note.replace(/\n/g, ' ');
    lines.push(`| ${label} | ${r.rating}/10 | ${note} |`);
  });
  lines.push('');

  // Six Reflection Prompts
  lines.push('### 🔮 Шесть итогов');
  lines.push('');
  const { sixReflectionPrompts: srp } = data;
  const reflectionItems = [
    ['🧠 Самое мудрое решение', srp.wisestDecision],
    ['📚 Главный урок', srp.biggestLesson],
    ['✅ Самое крупное завершённое дело', srp.biggestCompletion],
    ['🤝 Самое важное для других', srp.mostImportantForOthers],
    ['😲 Самая большая неожиданность', srp.biggestSurprise],
    ['🎲 Самый большой риск', srp.biggestRisk],
  ];
  reflectionItems.forEach(([label, value]) => {
    if (value?.trim()) {
      lines.push(`**${label}**`);
      lines.push('');
      lines.push(value);
      lines.push('');
    }
  });

  // Six Questions
  lines.push('### ❓ Шесть вопросов');
  lines.push('');
  const { sixQuestions: sq } = data;
  if (sq.gratefulFor.trim()) {
    lines.push('**🙏 За что ты больше всего благодарен(а)?**');
    lines.push('');
    lines.push(sq.gratefulFor);
    lines.push('');
  }
  if (sq.bestDiscoveredAboutSelf.trim()) {
    lines.push('**💡 Что лучшего ты открыл(а) в себе?**');
    lines.push('');
    lines.push(sq.bestDiscoveredAboutSelf);
    lines.push('');
  }
  if (sq.notAccomplished.trim()) {
    lines.push('**😔 Что не удалось сделать?**');
    lines.push('');
    lines.push(sq.notAccomplished);
    lines.push('');
  }
  if (sq.threeYouInfluenced.some(s => s.trim())) {
    lines.push('**🌟 Три человека, на которых я повлиял(а):**');
    sq.threeYouInfluenced.forEach((p, i) => p.trim() && lines.push(`${i + 1}. ${p}`));
    lines.push('');
  }
  if (sq.threeWhoInfluencedYou.some(s => s.trim())) {
    lines.push('**🙌 Три человека, которые повлияли на меня:**');
    sq.threeWhoInfluencedYou.forEach((p, i) => p.trim() && lines.push(`${i + 1}. ${p}`));
    lines.push('');
  }
  if (sq.mostProudOf.trim()) {
    lines.push('**🏅 Больше всего я горжусь:**');
    lines.push('');
    lines.push(sq.mostProudOf);
    lines.push('');
  }

  // Best Moments
  lines.push('### 💫 Лучшие моменты');
  lines.push('');
  if (data.bestMoments.moments.trim()) {
    lines.push(data.bestMoments.moments);
    lines.push('');
  }
  const bestPhotos = photosForSection('bestMoments');
  if (bestPhotos.length) {
    lines.push(photoBlock(bestPhotos, filenames, mode));
    lines.push('');
  }

  // Accomplishments & Challenges
  lines.push('### 🏆 Достижения и испытания');
  lines.push('');
  if (data.accomplishmentsChallenges.accomplishments.some(a => a.trim())) {
    lines.push('**Три главных достижения:**');
    data.accomplishmentsChallenges.accomplishments.forEach((a, i) => a.trim() && lines.push(`${i + 1}. ${a}`));
    lines.push('');
  }
  if (data.accomplishmentsChallenges.challenges.some(c => c.trim())) {
    lines.push('**Три главных испытания:**');
    data.accomplishmentsChallenges.challenges.forEach((c, i) => c.trim() && lines.push(`${i + 1}. ${c}`));
    lines.push('');
  }

  // Forgiveness
  if (data.forgiveness.text.trim()) {
    lines.push('### 🕊️ Прощение');
    lines.push('');
    lines.push(data.forgiveness.text);
    lines.push('');
  }

  // Letting Go
  if (data.lettingGo.text.trim()) {
    lines.push('### 🍂 Отпустить');
    lines.push('');
    lines.push(data.lettingGo.text);
    lines.push('');
  }

  // Closure
  lines.push('### 👋 Прощание с годом');
  lines.push('');
  if (data.closure.threeWords.some(w => w.trim())) {
    lines.push(`**Три слова этого года:** ${data.closure.threeWords.filter(w => w.trim()).join(' · ')}`);
    lines.push('');
  }
  if (data.closure.movieOrBookTitle.trim()) {
    lines.push(`**Название года как книги/фильма:** *${data.closure.movieOrBookTitle}*`);
    lines.push('');
  }
  if (data.closure.goodbyeMessage.trim()) {
    lines.push(`**Прощальное послание ${year} году:**`);
    lines.push('');
    lines.push(data.closure.goodbyeMessage);
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // ── PART 2 ────────────────────────────────────────────────────────────────

  lines.push(`## Часть 2: Планы на ${nextYear} год`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Dare to Dream
  lines.push('### ✨ Мечтай без ограничений');
  lines.push('');
  if (data.dareToDream.text.trim()) {
    lines.push(data.dareToDream.text);
    lines.push('');
  }
  const dreamPhotos = photosForSection('dareToDream');
  if (dreamPhotos.length) {
    lines.push(photoBlock(dreamPhotos, filenames, mode));
    lines.push('');
  }

  // Life Areas Goals
  lines.push('### 🎯 Цели по сферам жизни');
  lines.push('');
  data.lifeAreasGoals.goals.forEach(g => {
    if (!g.goal.trim() && !g.steps.trim()) return;
    const area = LIFE_AREAS.find(a => a.key === g.area);
    const label = area ? `${area.emoji} ${area.label}` : g.area;
    lines.push(`**${label}**`);
    if (g.goal.trim()) {
      lines.push(`Цель: ${g.goal}`);
    }
    if (g.steps.trim()) {
      lines.push(`Шаги: ${g.steps}`);
    }
    lines.push('');
  });

  // Magical Triplets
  lines.push('### 🔮 Магические тройки');
  lines.push('');
  data.magicalTriplets.triplets.forEach(t => {
    if (!t.items.some(i => i.trim())) return;
    lines.push(`**${t.label}**`);
    t.items.forEach((item, i) => item.trim() && lines.push(`${i + 1}. ${item}`));
    lines.push('');
  });

  // Six Sentences
  lines.push('### 📝 Шесть предложений');
  lines.push('');
  data.sixSentences.sentences.forEach(s => {
    if (!s.answer.trim()) return;
    lines.push(`**${s.prompt}**`);
    lines.push('');
    lines.push(s.answer);
    lines.push('');
  });

  // Word for Year
  if (data.wordForYear.word.trim()) {
    lines.push('### 🌟 Слово года');
    lines.push('');
    lines.push(`# ${data.wordForYear.word}`);
    lines.push('');
    if (data.wordForYear.why.trim()) {
      lines.push(data.wordForYear.why);
      lines.push('');
    }
  }

  // Secret Wish
  if (data.secretWish.wish.trim()) {
    lines.push('### 💫 Тайное желание');
    lines.push('');
    lines.push(data.secretWish.wish);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(`*Year Compass ${year} · Создано ${created}*`);

  return lines.join('\n');
}
