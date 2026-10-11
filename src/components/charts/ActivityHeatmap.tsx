import React, { useState } from 'react';

interface ActivityHeatmapProps {
  days: { date: string; count: number; hours: number; level: number }[];
  currentStreak: number;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ days, currentStreak }) => {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; hours: number } | null>(null);

  const weeks: { date: string; count: number; hours: number; level: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-blue-200 dark:bg-blue-950/70 border-blue-300 dark:border-blue-900';
      case 2:
        return 'bg-blue-400 dark:bg-blue-800 border-blue-500 dark:border-blue-700';
      case 3:
        return 'bg-blue-600 dark:bg-blue-600 border-blue-700 dark:border-blue-500';
      case 4:
        return 'bg-blue-700 dark:bg-blue-400 border-blue-800 dark:border-blue-300';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200/50 dark:border-zinc-800';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Daily Studio Consistency</span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">· 10-week momentum</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div key={lvl} className={`w-2.5 h-2.5 rounded-sm border ${getCellColor(lvl)}`} />
          ))}
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">More</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-3.5 h-3.5 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getCellColor(day.level)}`}
                  onMouseEnter={() => setHoveredDay({ date: day.date, hours: day.hours })}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            {hoveredDay ? (
              <span>
                <strong className="text-zinc-900 dark:text-zinc-200">{hoveredDay.date}</strong>: {hoveredDay.hours} hours logged
              </span>
            ) : (
              <span>Hover over a day block to view studio time</span>
            )}
          </div>
          <div className="font-medium text-zinc-900 dark:text-zinc-200">
            Streak: <span className="text-amber-600 dark:text-amber-400">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
