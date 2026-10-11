import React from 'react';
import {
  Sun,
  Moon,
  Flame,
  Clock,
  PlusCircle,
  Download,
  RotateCw,
  CheckCircle2,
  Smartphone,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useDesign } from '../context/DesignContext';

interface HeaderProps {
  onOpenLogModal: () => void;
  onOpenPhoneModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogModal, onOpenPhoneModal }) => {
  const {
    isDarkMode,
    toggleDarkMode,
    totalHoursLogged,
    currentStreakDays,
    totalTrialsLogged,
    completedMilestonesCount,
    totalMilestonesCount,
    exportBackupFile,
    setActiveTab,
    learningMode,
    toggleLearningMode,
  } = useDesign();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Offline status */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold text-base tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              At
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
                  ATELIER
                </span>
                <span className="hidden sm:inline text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Design & UI/UX Studio OS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Offline Verified</span>
                <span className="hidden md:inline">· Saves in real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Quick Metrics */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5" title="Daily Learning Streak">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{currentStreakDays}</span>
            <span>day streak</span>
          </div>
          
          <div className="flex items-center gap-1.5" title="Critique Trial Attempts Logged">
            <RotateCw className="w-4 h-4 text-purple-500" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalTrialsLogged}</span>
            <span>trials</span>
          </div>

          <div className="flex items-center gap-1.5" title="Total Studio Practice Time">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalHoursLogged}h</span>
            <span>practice</span>
          </div>

          <div className="flex items-center gap-1.5" title="Completed Syllabus Units">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{completedMilestonesCount}/{totalMilestonesCount}</span>
            <span>units</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Learning Mode Quick Switch */}
          <button
            onClick={toggleLearningMode}
            title={learningMode === 'diploma' ? 'Switch to Bachelor Academic Mode' : 'Switch to Diploma Plain-English Mode'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              learningMode === 'diploma'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/60 shadow-2xs'
                : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/60 shadow-2xs'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {learningMode === 'diploma' ? '🎓 Diploma Mode' : '🏛️ Bachelor Mode'}
            </span>
            <span className="sm:hidden font-mono text-[10px]">
              {learningMode === 'diploma' ? '🎓 Dip' : '🏛️ Bach'}
            </span>
          </button>

          {/* Open on Phone Button */}
          <button
            onClick={onOpenPhoneModal}
            title="Open & Install on your Phone (Works 100% Offline)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 shadow-2xs transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open on Phone</span>
            <span className="md:hidden">Phone</span>
          </button>

          <button
            onClick={onOpenLogModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Record Session</span>
            <span className="lg:hidden">Log</span>
          </button>

          <button
            onClick={exportBackupFile}
            title="Download complete JSON backup"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme mode"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
