import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  AppState,
  Milestone,
  LearningSession,
  PracticeBrief,
  UserSettings,
  DesignCategory,
  MilestoneStatus,
  TrialAttempt,
  ChecklistItem,
} from '../types';
import {
  DEFAULT_MILESTONES,
  DEFAULT_SESSIONS,
  DEFAULT_BRIEFS,
  DEFAULT_SETTINGS,
  DEFAULT_PHASES,
} from '../data/curriculumData';

const STORAGE_KEY = 'atelier_graphic_design_os_v2';

export type NavTab = 'dashboard' | 'roadmap' | 'coaching' | 'journal' | 'briefs' | 'sandbox' | 'backup';

export interface PhaseCoverageMetric {
  phaseId: number;
  title: string;
  totalSubtopics: number;
  completedSubtopics: number;
  inProgressSubtopics: number;
  totalChecklistItems: number;
  completedChecklistItems: number;
  totalTrials: number;
  percentage: number;
}

interface CategoryMetric {
  total: number;
  completed: number;
  inProgress: number;
  hours: number;
  percentage: number;
  trials: number;
}

interface DesignContextType {
  state: AppState;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Milestone Actions
  toggleMilestoneStatus: (id: string, specificStatus?: MilestoneStatus) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  toggleChecklistItem: (milestoneId: string, itemId: string) => void;
  addTrialAttempt: (milestoneId: string, trial: Omit<TrialAttempt, 'id'>) => void;
  deleteTrialAttempt: (milestoneId: string, trialId: string) => void;
  addCustomMilestone: (milestone: Omit<Milestone, 'id' | 'isCustom'>) => void;
  deleteCustomMilestone: (id: string) => void;

  // Session Actions
  addSession: (session: Omit<LearningSession, 'id' | 'createdAt'>) => void;
  deleteSession: (id: string) => void;

  // Brief Actions
  toggleBriefStatus: (id: string) => void;
  updateBrief: (id: string, updates: Partial<PracticeBrief>) => void;
  addCustomBrief: (brief: Omit<PracticeBrief, 'id'>) => void;

  // Settings & Learning Mode
  updateSettings: (updates: Partial<UserSettings>) => void;
  learningMode: 'diploma' | 'bachelor';
  setLearningMode: (mode: 'diploma' | 'bachelor') => void;
  toggleLearningMode: () => void;

  // Backup & Export
  exportBackupFile: () => void;
  getBackupJSONString: () => string;
  importBackupJSON: (jsonStr: string) => { success: boolean; message: string };
  exportMarkdownReport: () => void;
  resetAllData: () => void;

  // Computed Analytics
  overallCoveragePercentage: number;
  phaseCoverageMetrics: PhaseCoverageMetric[];
  totalTrialsLogged: number;
  totalHoursLogged: number;
  currentStreakDays: number;
  completedMilestonesCount: number;
  totalMilestonesCount: number;
  categoryMetrics: Record<DesignCategory, CategoryMetric>;
  recent14DaysTrend: { date: string; hours: number; label: string }[];
  activityGridDays: { date: string; count: number; hours: number; level: number }[];
  weeklyGoalProgress: { logged: number; target: number; percentage: number };
  activeBriefsCount: number;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Hydrate state from localStorage or load university defaults
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.milestones)) {
          return {
            version: parsed.version || 2,
            settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
            milestones: parsed.milestones,
            sessions: parsed.sessions || [],
            briefs: parsed.briefs || DEFAULT_BRIEFS,
            lastBackupDate: parsed.lastBackupDate,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored Atelier data, using defaults', e);
    }
    return {
      version: 2,
      settings: DEFAULT_SETTINGS,
      milestones: DEFAULT_MILESTONES,
      sessions: DEFAULT_SESSIONS,
      briefs: DEFAULT_BRIEFS,
    };
  });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('atelier_theme_mode');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('atelier_theme_mode', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('atelier_theme_mode', 'light');
    }
  }, [isDarkMode]);

  // Persist state on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [state]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  const learningMode = state.settings.learningMode || 'diploma';

  const setLearningMode = useCallback((mode: 'diploma' | 'bachelor') => {
    updateSettings({ learningMode: mode });
  }, [updateSettings]);

  const toggleLearningMode = useCallback(() => {
    const nextMode = learningMode === 'diploma' ? 'bachelor' : 'diploma';
    updateSettings({ learningMode: nextMode });
  }, [learningMode, updateSettings]);

  // Milestone Actions
  const toggleMilestoneStatus = useCallback((id: string, specificStatus?: MilestoneStatus) => {
    setState((prev) => {
      const updated = prev.milestones.map((m) => {
        if (m.id !== id) return m;
        let nextStatus: MilestoneStatus;
        if (specificStatus) {
          nextStatus = specificStatus;
        } else {
          if (m.status === 'not-started') nextStatus = 'in-progress';
          else if (m.status === 'in-progress') nextStatus = 'completed';
          else nextStatus = 'not-started';
        }

        return {
          ...m,
          status: nextStatus,
          completedAt: nextStatus === 'completed' ? (m.completedAt || new Date().toISOString()) : undefined,
          startedAt: nextStatus === 'in-progress' ? (m.startedAt || new Date().toISOString()) : m.startedAt,
        };
      });
      return { ...prev, milestones: updated };
    });
  }, []);

  const updateMilestone = useCallback((id: string, updates: Partial<Milestone>) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  }, []);

  const toggleChecklistItem = useCallback((milestoneId: string, itemId: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => {
        if (m.id !== milestoneId) return m;
        const updatedItems = m.checklistItems.map((item) =>
          item.id === itemId ? { ...item, done: !item.done } : item
        );
        // If all checklist items are done, mark milestone as completed automatically!
        const allDone = updatedItems.length > 0 && updatedItems.every((item) => item.done);
        return {
          ...m,
          checklistItems: updatedItems,
          status: allDone ? 'completed' : m.status === 'not-started' ? 'in-progress' : m.status,
          completedAt: allDone ? (m.completedAt || new Date().toISOString()) : m.completedAt,
        };
      }),
    }));
  }, []);

  const addTrialAttempt = useCallback((milestoneId: string, trial: Omit<TrialAttempt, 'id'>) => {
    const newTrial: TrialAttempt = {
      ...trial,
      id: `trial-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => {
        if (m.id !== milestoneId) return m;
        return {
          ...m,
          trials: [newTrial, ...(m.trials || [])],
        };
      }),
    }));
  }, []);

  const deleteTrialAttempt = useCallback((milestoneId: string, trialId: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => {
        if (m.id !== milestoneId) return m;
        return {
          ...m,
          trials: (m.trials || []).filter((t) => t.id !== trialId),
        };
      }),
    }));
  }, []);

  const addCustomMilestone = useCallback((milestone: Omit<Milestone, 'id' | 'isCustom'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: `custom-${Date.now()}`,
      isCustom: true,
      trials: [],
      checklistItems: [
        { id: `c-1`, label: 'Complete initial conceptual research and references', done: false },
        { id: `c-2`, label: 'Execute trial version on laptop', done: false },
        { id: `c-3`, label: 'Self-evaluate against academic criteria', done: false },
      ],
    };
    setState((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
  }, []);

  const deleteCustomMilestone = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  }, []);

  // Session Actions
  const addSession = useCallback((session: Omit<LearningSession, 'id' | 'createdAt'>) => {
    const newSession: LearningSession = {
      ...session,
      id: `s-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      sessions: [newSession, ...prev.sessions],
    }));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((s) => s.id !== id),
    }));
  }, []);

  // Brief Actions
  const toggleBriefStatus = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      briefs: prev.briefs.map((b) => {
        if (b.id !== id) return b;
        const nextStatus = b.status === 'unstarted' ? 'in-progress' : b.status === 'in-progress' ? 'completed' : 'unstarted';
        return {
          ...b,
          status: nextStatus,
          completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
        };
      }),
    }));
  }, []);

  const updateBrief = useCallback((id: string, updates: Partial<PracticeBrief>) => {
    setState((prev) => ({
      ...prev,
      briefs: prev.briefs.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  }, []);

  const addCustomBrief = useCallback((brief: Omit<PracticeBrief, 'id'>) => {
    const newBrief: PracticeBrief = {
      ...brief,
      id: `brief-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      briefs: [newBrief, ...prev.briefs],
    }));
  }, []);

  // Backup & Export Functions
  const getBackupJSONString = useCallback(() => {
    return JSON.stringify(
      {
        ...state,
        lastBackupDate: new Date().toISOString(),
      },
      null,
      2
    );
  }, [state]);

  const exportBackupFile = useCallback(() => {
    const dataStr = getBackupJSONString();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `atelier-graphic-design-studio-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setState((prev) => ({
      ...prev,
      lastBackupDate: new Date().toISOString(),
    }));
  }, [getBackupJSONString]);

  const importBackupJSON = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || !Array.isArray(parsed.milestones)) {
        return { success: false, message: 'Invalid backup file: Missing curriculum milestone data.' };
      }
      setState({
        version: parsed.version || 2,
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
        milestones: parsed.milestones,
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        briefs: Array.isArray(parsed.briefs) ? parsed.briefs : DEFAULT_BRIEFS,
        lastBackupDate: new Date().toISOString(),
      });
      return { success: true, message: `Successfully restored ${parsed.milestones.length} syllabus subtopics and ${parsed.sessions?.length || 0} practice sessions.` };
    } catch (e: any) {
      return { success: false, message: `Failed to import JSON: ${e.message || 'Syntax error'}` };
    }
  }, []);

  const exportMarkdownReport = useCallback(() => {
    const dateStr = new Date().toISOString().split('T')[0];
    const totalHours = state.sessions.reduce((sum, s) => sum + s.durationHours, 0);
    const completed = state.milestones.filter((m) => m.status === 'completed');
    const inProgress = state.milestones.filter((m) => m.status === 'in-progress');
    const totalTrials = state.milestones.reduce((acc, m) => acc + (m.trials?.length || 0), 0);

    let md = `# Atelier: Bachelor Graphic Design & UI/UX Studio Academic Dossier\n`;
    md += `*Generated on: ${dateStr}*\n\n`;
    md += `## 🎓 Academic Summary\n`;
    md += `- **Student Designer**: ${state.settings.userName}\n`;
    md += `- **Total Studio Practice Hours Logged**: ${totalHours.toFixed(1)} hrs\n`;
    md += `- **Completed Subtopics**: ${completed.length} / ${state.milestones.length}\n`;
    md += `- **Total Iteration Trials Recorded**: ${totalTrials} iterations\n\n`;

    md += `## 📚 Subtopic Coverage & Evaluations\n`;
    state.milestones.forEach((m) => {
      md += `### Phase ${m.phaseId}: ${m.title} [${m.status.toUpperCase()}]\n`;
      md += `- **Discipline**: ${m.category}\n`;
      md += `- **Bachelor Standard**: ${m.workCriteria.bachelorStandard}\n`;
      md += `- **Checklist Progress**: ${m.checklistItems.filter(c => c.done).length}/${m.checklistItems.length} tasks completed\n`;
      if (m.trials && m.trials.length > 0) {
        md += `- **Trial Attempts**: ${m.trials.length} iterations (Latest score: ${m.trials[0].score}/100 - ${m.trials[0].versionTitle})\n`;
      }
      if (m.userNotes) md += `- **Student Critique Notes**: ${m.userNotes}\n`;
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atelier-studio-dossier-${dateStr}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state]);

  const resetAllData = useCallback(() => {
    setState({
      version: 2,
      settings: DEFAULT_SETTINGS,
      milestones: DEFAULT_MILESTONES,
      sessions: DEFAULT_SESSIONS,
      briefs: DEFAULT_BRIEFS,
      lastBackupDate: undefined,
    });
  }, []);

  // Total trial attempts logged across all subtopics
  const totalTrialsLogged = useMemo(() => {
    return state.milestones.reduce((acc, m) => acc + (m.trials ? m.trials.length : 0), 0);
  }, [state.milestones]);

  // Overall Coverage Percentage: combination of milestone status and checklist progress
  const overallCoveragePercentage = useMemo(() => {
    if (state.milestones.length === 0) return 0;
    let totalScore = 0;
    state.milestones.forEach((m) => {
      if (m.status === 'completed') {
        totalScore += 100;
      } else {
        const totalItems = m.checklistItems.length;
        const doneItems = m.checklistItems.filter((i) => i.done).length;
        const checklistFraction = totalItems > 0 ? (doneItems / totalItems) * 70 : 0;
        const trialFraction = m.trials && m.trials.length > 0 ? 30 : 0;
        totalScore += checklistFraction + trialFraction;
      }
    });
    return Math.round(totalScore / state.milestones.length);
  }, [state.milestones]);

  // Per Phase Coverage
  const phaseCoverageMetrics = useMemo<PhaseCoverageMetric[]>(() => {
    return DEFAULT_PHASES.map((phase) => {
      const phaseMilestones = state.milestones.filter((m) => m.phaseId === phase.id);
      const totalSubtopics = phaseMilestones.length;
      const completedSubtopics = phaseMilestones.filter((m) => m.status === 'completed').length;
      const inProgressSubtopics = phaseMilestones.filter((m) => m.status === 'in-progress').length;

      let totalChecklistItems = 0;
      let completedChecklistItems = 0;
      let totalTrials = 0;

      phaseMilestones.forEach((m) => {
        totalChecklistItems += m.checklistItems.length;
        completedChecklistItems += m.checklistItems.filter((i) => i.done).length;
        totalTrials += m.trials?.length || 0;
      });

      let percentage = 0;
      if (totalSubtopics > 0) {
        if (totalChecklistItems > 0) {
          percentage = Math.round((completedChecklistItems / totalChecklistItems) * 100);
        } else {
          percentage = Math.round((completedSubtopics / totalSubtopics) * 100);
        }
      }

      return {
        phaseId: phase.id,
        title: phase.title,
        totalSubtopics,
        completedSubtopics,
        inProgressSubtopics,
        totalChecklistItems,
        completedChecklistItems,
        totalTrials,
        percentage,
      };
    });
  }, [state.milestones]);

  const totalHoursLogged = useMemo(() => {
    return Number(state.sessions.reduce((acc, s) => acc + s.durationHours, 0).toFixed(1));
  }, [state.sessions]);

  const completedMilestonesCount = useMemo(() => {
    return state.milestones.filter((m) => m.status === 'completed').length;
  }, [state.milestones]);

  const totalMilestonesCount = state.milestones.length;

  // Streak
  const currentStreakDays = useMemo(() => {
    if (state.sessions.length === 0) return 0;
    const sessionDates = Array.from(new Set(state.sessions.map((s) => s.date))).sort().reverse();
    if (sessionDates.length === 0) return 0;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const latestDate = sessionDates[0];
    if (latestDate !== todayStr && latestDate !== yesterdayStr) {
      return 0;
    }

    let streak = 0;
    let checkDate = new Date(latestDate);

    for (let i = 0; i < sessionDates.length; i++) {
      const expectedStr = checkDate.toISOString().split('T')[0];
      if (sessionDates.includes(expectedStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [state.sessions]);

  // Category Metrics
  const categoryMetrics = useMemo(() => {
    const categories: DesignCategory[] = [
      'Typography',
      'Color Theory',
      'Layout & Grid',
      'Vector & Pen Tool',
      'Brand Identity',
      'Editorial & Print',
      'UI/UX & Design Systems',
      'Portfolio & Delivery',
    ];

    const result = {} as Record<DesignCategory, CategoryMetric>;

    categories.forEach((cat) => {
      const catMilestones = state.milestones.filter((m) => m.category === cat);
      const total = catMilestones.length;
      const completed = catMilestones.filter((m) => m.status === 'completed').length;
      const inProgress = catMilestones.filter((m) => m.status === 'in-progress').length;
      const hours = state.sessions
        .filter((s) => s.category === cat)
        .reduce((sum, s) => sum + s.durationHours, 0);
      const trials = catMilestones.reduce((acc, m) => acc + (m.trials?.length || 0), 0);

      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      result[cat] = {
        total,
        completed,
        inProgress,
        hours: Number(hours.toFixed(1)),
        percentage,
        trials,
      };
    });

    return result;
  }, [state.milestones, state.sessions]);

  // Recent 14 Days Trend
  const recent14DaysTrend = useMemo(() => {
    const days: { date: string; hours: number; label: string }[] = [];
    const today = new Date();

    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const hours = state.sessions
        .filter((s) => s.date === dateStr)
        .reduce((sum, s) => sum + s.durationHours, 0);

      const label = d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
      days.push({
        date: dateStr,
        hours: Number(hours.toFixed(1)),
        label,
      });
    }

    return days;
  }, [state.sessions]);

  // 70 Days Activity Heatmap
  const activityGridDays = useMemo(() => {
    const days: { date: string; count: number; hours: number; level: number }[] = [];
    const today = new Date();

    for (let i = 69; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const sessionsOnDate = state.sessions.filter((s) => s.date === dateStr);
      const hours = sessionsOnDate.reduce((sum, s) => sum + s.durationHours, 0);
      const count = sessionsOnDate.length;

      let level = 0;
      if (hours > 0) {
        if (hours < 1.0) level = 1;
        else if (hours < 2.5) level = 2;
        else if (hours < 4.0) level = 3;
        else level = 4;
      }

      days.push({
        date: dateStr,
        count,
        hours: Number(hours.toFixed(1)),
        level,
      });
    }

    return days;
  }, [state.sessions]);

  // Weekly Goal
  const weeklyGoalProgress = useMemo(() => {
    const target = state.settings.weeklyGoalHours || 10;
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const logged = state.sessions
      .filter((s) => new Date(s.date) >= startOfWeek)
      .reduce((sum, s) => sum + s.durationHours, 0);

    const percentage = Math.min(100, Math.round((logged / target) * 100));

    return {
      logged: Number(logged.toFixed(1)),
      target,
      percentage,
    };
  }, [state.sessions, state.settings.weeklyGoalHours]);

  const activeBriefsCount = useMemo(() => {
    return state.briefs.filter((b) => b.status === 'in-progress').length;
  }, [state.briefs]);

  return (
    <DesignContext.Provider
      value={{
        state,
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        toggleMilestoneStatus,
        updateMilestone,
        toggleChecklistItem,
        addTrialAttempt,
        deleteTrialAttempt,
        addCustomMilestone,
        deleteCustomMilestone,
        addSession,
        deleteSession,
        toggleBriefStatus,
        updateBrief,
        addCustomBrief,
        updateSettings,
        learningMode,
        setLearningMode,
        toggleLearningMode,
        exportBackupFile,
        getBackupJSONString,
        importBackupJSON,
        exportMarkdownReport,
        resetAllData,
        overallCoveragePercentage,
        phaseCoverageMetrics,
        totalTrialsLogged,
        totalHoursLogged,
        currentStreakDays,
        completedMilestonesCount,
        totalMilestonesCount,
        categoryMetrics,
        recent14DaysTrend,
        activityGridDays,
        weeklyGoalProgress,
        activeBriefsCount,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
