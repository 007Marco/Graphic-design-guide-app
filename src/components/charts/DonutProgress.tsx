import React from 'react';

interface DonutProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorClass?: string;
}

export const DonutProgress: React.FC<DonutProgressProps> = ({
  percentage,
  size = 110,
  strokeWidth = 9,
  label,
  sublabel,
  colorClass = 'stroke-blue-600 dark:stroke-blue-400',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percentage));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-zinc-100 dark:stroke-zinc-800"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${colorClass} transition-all duration-700 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {label ?? `${clamped}%`}
        </span>
        {sublabel && (
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
