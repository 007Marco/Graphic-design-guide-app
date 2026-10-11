import React, { useState } from 'react';

interface HoursTrendChartProps {
  data: { date: string; hours: number; label: string }[];
}

export const HoursTrendChart: React.FC<HoursTrendChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxHours = Math.max(3.5, ...data.map((d) => d.hours));
  const barWidth = 14;
  const totalHoursInWindow = data.reduce((sum, d) => sum + d.hours, 0);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Last 14 Days Studio Practice Volume
        </span>
        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
          {totalHoursInWindow.toFixed(1)} hrs total
        </span>
      </div>

      <div className="relative h-[150px] w-full pt-4">
        {/* Subtle grid lines */}
        <div className="absolute inset-x-0 top-4 border-b border-dashed border-zinc-200 dark:border-zinc-800" />
        <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-zinc-200 dark:border-zinc-800" />
        <div className="absolute inset-x-0 bottom-6 border-b border-zinc-200 dark:border-zinc-800" />

        {/* Bars Container */}
        <div className="h-[120px] flex items-end justify-between px-1">
          {data.map((item, idx) => {
            const barHeight = Math.max(4, (item.hours / maxHours) * 96);
            const isHovered = hoveredIdx === idx;
            const isToday = idx === data.length - 1;

            return (
              <div
                key={item.date}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-3 z-10 -translate-y-full px-2 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[11px] rounded shadow-md pointer-events-none whitespace-nowrap">
                    <span className="font-semibold">{item.hours}h</span> on {item.label}
                  </div>
                )}

                {/* The Bar */}
                <div
                  style={{ height: `${barHeight}px`, width: `${barWidth}px` }}
                  className={`rounded-t transition-all duration-200 ${
                    item.hours > 0
                      ? isHovered
                        ? 'bg-blue-600 dark:bg-blue-400'
                        : isToday
                        ? 'bg-blue-500 dark:bg-blue-500'
                        : 'bg-zinc-700 dark:bg-zinc-400'
                      : 'bg-zinc-100 dark:bg-zinc-800/80'
                  }`}
                />

                {/* Day Label */}
                <span
                  className={`mt-2 text-[10px] tracking-tight transition-colors ${
                    isHovered
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : isToday
                      ? 'text-zinc-900 dark:text-zinc-200 font-medium'
                      : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  {item.label.split(',')[0].slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
