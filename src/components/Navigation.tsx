import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  BookOpen,
  Sparkles,
  Sliders,
  Database,
} from 'lucide-react';
import { useDesign, NavTab } from '../context/DesignContext';

interface TabItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const Navigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    completedMilestonesCount,
    totalMilestonesCount,
    totalTrialsLogged,
    activeBriefsCount,
  } = useDesign();

  const tabs: TabItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'roadmap',
      label: 'Syllabus & Subtopics',
      icon: Compass,
      badge: `${completedMilestonesCount}/${totalMilestonesCount}`,
    },
    {
      id: 'coaching',
      label: 'Client Relations & Coaching',
      icon: Briefcase,
    },
    {
      id: 'journal',
      label: 'Studio Journal',
      icon: BookOpen,
      badge: totalTrialsLogged > 0 ? `${totalTrialsLogged} trials` : undefined,
    },
    {
      id: 'briefs',
      label: 'Practice Briefs',
      icon: Sparkles,
      badge: activeBriefsCount > 0 ? `${activeBriefsCount} active` : undefined,
    },
    {
      id: 'sandbox',
      label: 'Design Sandbox',
      icon: Sliders,
    },
    {
      id: 'backup',
      label: 'Backup & Sync',
      icon: Database,
    },
  ];

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                      : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
