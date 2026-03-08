import { useState } from 'react';
import { useYearCompassStore } from '../../../store/yearCompassStore';
import { SectionHeader } from '../../layout/SectionHeader';
import { LIFE_AREAS } from '../../../constants/lifeAreas';
import type { LifeAreaKey } from '../../../types/yearCompass';

export function LifeAreasGoals() {
  const goals = useYearCompassStore(s => s.data.lifeAreasGoals.goals);
  const updateGoal = useYearCompassStore(s => s.updateLifeAreaGoal);
  const [expanded, setExpanded] = useState<LifeAreaKey | null>(null);

  return (
    <div className="flex flex-col gap-3 px-4 pb-24">
      <SectionHeader
        part={2}
        title="Цели по сферам"
        subtitle="Поставь цель и шаги к ней для каждой области жизни"
      />

      {LIFE_AREAS.map((area) => {
        const goalData = goals.find(g => g.area === area.key);
        const isExpanded = expanded === area.key;

        return (
          <div
            key={area.key}
            className="rounded-2xl overflow-hidden"
            style={{ background: area.color }}
          >
            <button
              className="w-full flex items-center justify-between p-4"
              onClick={() => setExpanded(isExpanded ? null : area.key as LifeAreaKey)}
            >
              <span className="font-medium text-sm" style={{ color: '#111' }}>
                {area.emoji} {area.label}
              </span>
              <div className="flex items-center gap-2">
                {goalData?.goal && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/40" style={{ color: '#333' }}>
                    ✓
                  </span>
                )}
                <span style={{ color: '#555' }}>{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: '#444' }}>
                    Цель
                  </label>
                  <textarea
                    value={goalData?.goal ?? ''}
                    onChange={(e) => updateGoal(area.key as LifeAreaKey, 'goal', e.target.value)}
                    placeholder="Чего ты хочешь достичь в этой сфере?"
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none bg-white/60"
                    style={{ color: '#111', border: '1px solid rgba(0,0,0,0.1)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: '#444' }}>
                    Конкретные шаги
                  </label>
                  <textarea
                    value={goalData?.steps ?? ''}
                    onChange={(e) => updateGoal(area.key as LifeAreaKey, 'steps', e.target.value)}
                    placeholder="Как именно ты этого достигнешь?"
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none bg-white/60"
                    style={{ color: '#111', border: '1px solid rgba(0,0,0,0.1)' }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
