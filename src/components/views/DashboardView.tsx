import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Compass,
  ArrowRight,
  CheckCircle2,
  Circle,
  Play,
  Sparkles,
  Quote,
  Target,
  PlusCircle,
  Edit2,
  Check,
  RotateCw,
  Briefcase,
  Award,
  Smartphone,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { DESIGN_QUOTES, DEFAULT_PHASES } from '../../data/curriculumData';
import { RadarChart } from '../charts/RadarChart';
import { HoursTrendChart } from '../charts/HoursTrendChart';
import { ActivityHeatmap } from '../charts/ActivityHeatmap';
import { DonutProgress } from '../charts/DonutProgress';
import { Milestone } from '../../types';

interface DashboardViewProps {
  onOpenLogModal: () => void;
  onOpenSubtopicMiniPage: (m: Milestone) => void;
  onTriggerConfetti: () => void;
  onOpenPhoneModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenLogModal,
  onOpenSubtopicMiniPage,
  onTriggerConfetti,
  onOpenPhoneModal,
}) => {
  const {
    state,
    setActiveTab,
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
    toggleMilestoneStatus,
    updateSettings,
    learningMode,
    toggleLearningMode,
  } = useDesign();

  const quoteIdx = new Date().getDate() % DESIGN_QUOTES.length;
  const todayQuote = DESIGN_QUOTES[quoteIdx];

  const activeMilestones = state.milestones.filter((m) => m.status === 'in-progress');
  const upcomingMilestones = state.milestones.filter((m) => m.status === 'not-started').slice(0, 3);
  const prioritizedMilestones = [...activeMilestones, ...upcomingMilestones].slice(0, 4);

  const recentSessions = state.sessions.slice(0, 4);

  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newWeeklyGoal, setNewWeeklyGoal] = useState(state.settings.weeklyGoalHours);

  const handleSaveGoal = () => {
    updateSettings({ weeklyGoalHours: Math.max(1, newWeeklyGoal) });
    setIsEditingGoal(false);
  };

  const handleToggleComplete = (m: Milestone, e: React.MouseEvent) => {
    e.stopPropagation();
    if (m.status !== 'completed') {
      toggleMilestoneStatus(m.id, 'completed');
      onTriggerConfetti();
    } else {
      toggleMilestoneStatus(m.id, 'in-progress');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              <span>{learningMode === 'diploma' ? 'Diploma Practical Studio' : 'Campus Studio Workspace'}</span>
              <span>·</span>
              <span>Welcome back, {state.settings.userName}</span>
              <button
                onClick={toggleLearningMode}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {learningMode === 'diploma' ? '🎓 Diploma Mode (Simple)' : '🏛️ Bachelor Mode (Academic)'}
              </button>
            </div>
            <p className="text-sm italic text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
              <Quote className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <span>
                "{todayQuote.quote}" <strong className="font-semibold not-italic text-zinc-900 dark:text-zinc-100">— {todayQuote.author}</strong>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onOpenPhoneModal && (
              <button
                onClick={onOpenPhoneModal}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Open on Phone</span>
              </button>
            )}
            <button
              onClick={onOpenLogModal}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Studio Session</span>
            </button>
            <button
              onClick={() => setActiveTab('coaching')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-purple-500" />
              <span>Client Relations Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Diploma Student Tip & Mobile Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: Diploma Student Friendly Guidance */}
        <div className="p-4 rounded-xl bg-linear-to-r from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-900/40 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Diploma Student 15-Minute Rule
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                Laptop Habit
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Don’t get stuck in theory! Spend <strong>5 minutes</strong> examining real brand examples, <strong>5 minutes</strong> doodling on paper, and <strong>5 minutes</strong> executing in free Figma or Photopea.
            </p>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-0.5 inline-block cursor-pointer"
            >
              View Plain-English Syllabus →
            </button>
          </div>
        </div>

        {/* Banner 2: Phone Access & PWA Offline */}
        <div className="p-4 rounded-xl bg-linear-to-r from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Take Atelier on Your Phone
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                100% Offline
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Open the camera on your phone to scan and install Atelier as a mobile app. Works with zero cellular data so you can study in transit or in bed!
            </p>
            {onOpenPhoneModal && (
              <button
                onClick={onOpenPhoneModal}
                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-0.5 inline-block cursor-pointer"
              >
                Scan Phone QR Code & Install Guide →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Syllabus Coverage */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Syllabus Coverage
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {overallCoveragePercentage}%
              </span>
              <span className="text-xs text-zinc-500">
                {completedMilestonesCount}/{totalMilestonesCount} done
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Weighted by task checklists
            </p>
          </div>
          <DonutProgress percentage={overallCoveragePercentage} size={64} strokeWidth={6} />
        </div>

        {/* Card 2: Trial Iterations Logged */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Critique Iterations
            </span>
            <RotateCw className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalTrialsLogged}
              </span>
              <span className="text-xs text-zinc-500">
                trial versions logged
              </span>
            </div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
              Iterative refinement builds mastery
            </p>
          </div>
        </div>

        {/* Card 3: Study Streak */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Studio Momentum
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {currentStreakDays}
              </span>
              <span className="text-xs text-zinc-500">
                {currentStreakDays === 1 ? 'day active' : 'days in a row'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
              Consistent daily practice
            </p>
          </div>
        </div>

        {/* Card 4: Total Hours & Weekly Goal */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Weekly Practice Target
            </span>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="p-1 rounded text-zinc-400 hover:text-zinc-700"
              title="Edit weekly goal"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-1">
            {isEditingGoal ? (
              <div className="flex items-center gap-1.5 my-1">
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={newWeeklyGoal}
                  onChange={(e) => setNewWeeklyGoal(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs border rounded dark:bg-zinc-800"
                />
                <button
                  onClick={handleSaveGoal}
                  className="p-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {weeklyGoalProgress.logged}h
                </span>
                <span className="text-xs text-zinc-500">
                  / {weeklyGoalProgress.target}h target
                </span>
              </div>
            )}
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${weeklyGoalProgress.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {totalHoursLogged}h total practice logged
            </p>
          </div>
        </div>

      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Subtopics & Phase Coverage breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Priority Subtopics */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Active & Next Subtopics in Syllabus
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Click any card to open the complete academic criteria, specimen, and trial logger
                </p>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Full Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {prioritizedMilestones.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  All current syllabus milestones completed!
                </div>
              ) : (
                prioritizedMilestones.map((m) => {
                  const isCompleted = m.status === 'completed';
                  const isInProgress = m.status === 'in-progress';
                  const completedChecks = m.checklistItems.filter((i) => i.done).length;
                  const totalChecks = m.checklistItems.length;

                  return (
                    <div
                      key={m.id}
                      onClick={() => onOpenSubtopicMiniPage(m)}
                      className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-500 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800/80 transition-all cursor-pointer flex items-start gap-3"
                    >
                      <button
                        type="button"
                        onClick={(e) => handleToggleComplete(m, e)}
                        className="mt-0.5 text-zinc-400 hover:text-emerald-500 transition-colors"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                        ) : isInProgress ? (
                          <Play className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-amber-950/50" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{m.category}</span>
                          <span>·</span>
                          <span>Phase {m.phaseId}</span>
                          <span>·</span>
                          <span>{m.estimatedHours}h unit</span>
                          {m.trials && m.trials.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-purple-600 dark:text-purple-400 font-medium">
                                {m.trials.length} trial{m.trials.length === 1 ? '' : 's'}
                              </span>
                            </>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5 truncate">
                          {m.title}
                        </h4>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 mt-0.5">
                          {m.shortDesc}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-500">
                          <span>Checklist: {completedChecks}/{totalChecks} done</span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                            Inspect Workbook & Specimen →
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-2" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Phase-by-Phase Coverage Progress */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Syllabus Phase Coverage Progress
            </h3>

            <div className="space-y-3">
              {phaseCoverageMetrics.map((phase) => (
                <div key={phase.phaseId} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      P{phase.phaseId}: {phase.title.split(':')[1]?.trim() || phase.title}
                    </span>
                    <span className="font-mono text-zinc-500">
                      {phase.completedSubtopics}/{phase.totalSubtopics} done ({phase.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${phase.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Charts & Analytics */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="mb-2">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Creative Skills Radar & Disciplines
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Multi-axis competence across the 8 core pillars
              </p>
            </div>
            <RadarChart categoryMetrics={categoryMetrics} />
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <HoursTrendChart data={recent14DaysTrend} />
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <ActivityHeatmap days={activityGridDays} currentStreak={currentStreakDays} />
          </div>

        </div>

      </div>

    </div>
  );
};
