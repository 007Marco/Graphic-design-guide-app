import React, { useState } from 'react';
import { DesignCategory } from '../../types';

interface RadarChartProps {
  categoryMetrics: Record<DesignCategory, { total: number; completed: number; percentage: number; hours: number; trials: number }>;
}

export const RadarChart: React.FC<RadarChartProps> = ({ categoryMetrics }) => {
  const [activeCategory, setActiveCategory] = useState<DesignCategory | null>(null);

  const categories = Object.keys(categoryMetrics) as DesignCategory[];
  const numAxes = categories.length;
  const size = 320;
  const center = size / 2;
  const radius = 105;

  const getCoordinates = (index: number, valueFactor: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = radius * valueFactor;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = categories.map((cat, i) => {
    const metric = categoryMetrics[cat];
    const factor = Math.max(0.08, Math.min(1, metric.percentage / 100));
    const { x, y } = getCoordinates(i, factor);
    return `${x},${y}`;
  }).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Design Skills Radar Chart"
        >
          {/* Concentric Web Rings */}
          {rings.map((ringFactor) => {
            const ringPoints = categories.map((_, i) => {
              const { x, y } = getCoordinates(i, ringFactor);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={`ring-${ringFactor}`}
                points={ringPoints}
                className="fill-none stroke-zinc-200 dark:stroke-zinc-800 stroke-[1]"
                strokeDasharray={ringFactor === 1 ? 'none' : '3 3'}
              />
            );
          })}

          {/* Spokes */}
          {categories.map((cat, i) => {
            const outerCoord = getCoordinates(i, 1);
            return (
              <line
                key={`spoke-${cat}`}
                x1={center}
                y1={center}
                x2={outerCoord.x}
                y2={outerCoord.y}
                className="stroke-zinc-200 dark:stroke-zinc-800 stroke-[1]"
              />
            );
          })}

          {/* Value Polygon */}
          <polygon
            points={points}
            className="fill-blue-500/20 dark:fill-blue-400/25 stroke-blue-600 dark:stroke-blue-400 stroke-2 transition-all duration-300"
          />

          {/* Data Vertex Dots */}
          {categories.map((cat, i) => {
            const metric = categoryMetrics[cat];
            const factor = Math.max(0.08, Math.min(1, metric.percentage / 100));
            const coord = getCoordinates(i, factor);
            const isHovered = activeCategory === cat;

            return (
              <g key={`vertex-${cat}`} className="cursor-pointer" onMouseEnter={() => setActiveCategory(cat)}>
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isHovered ? 6 : 4}
                  className={`transition-all duration-200 ${
                    isHovered
                      ? 'fill-blue-600 dark:fill-blue-300 stroke-white dark:stroke-zinc-950 stroke-2'
                      : 'fill-blue-500 dark:fill-blue-400'
                  }`}
                />
              </g>
            );
          })}

          {/* Labels */}
          {categories.map((cat, i) => {
            const labelCoord = getCoordinates(i, 1.28);
            const isHovered = activeCategory === cat;
            const metric = categoryMetrics[cat];

            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (labelCoord.x > center + 15) textAnchor = 'start';
            else if (labelCoord.x < center - 15) textAnchor = 'end';

            return (
              <text
                key={`label-${cat}`}
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                onMouseEnter={() => setActiveCategory(cat)}
                className={`text-[10px] font-medium cursor-pointer transition-colors duration-150 ${
                  isHovered
                    ? 'fill-blue-600 dark:fill-blue-400 font-semibold'
                    : 'fill-zinc-600 dark:fill-zinc-400'
                }`}
              >
                {cat.split(' ')[0]} {metric.percentage}%
              </text>
            );
          })}
        </svg>
      </div>

      {/* Active category details box */}
      <div className="mt-2 w-full text-center min-h-[44px]">
        {activeCategory ? (
          <div className="inline-block text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{activeCategory}</span>
            <span className="mx-1.5 text-zinc-400">·</span>
            <span>{categoryMetrics[activeCategory].percentage}% complete</span>
            <span className="mx-1.5 text-zinc-400">·</span>
            <span>{categoryMetrics[activeCategory].completed}/{categoryMetrics[activeCategory].total} subtopics</span>
            <span className="mx-1.5 text-zinc-400">·</span>
            <span>{categoryMetrics[activeCategory].trials} trials</span>
            <span className="mx-1.5 text-zinc-400">·</span>
            <span>{categoryMetrics[activeCategory].hours}h logged</span>
          </div>
        ) : (
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Hover over any discipline to inspect your academic mastery level
          </p>
        )}
      </div>
    </div>
  );
};
