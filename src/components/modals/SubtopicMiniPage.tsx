import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Circle,
  Play,
  Clock,
  BookOpen,
  Award,
  Video,
  Layers,
  RotateCw,
  Plus,
  ExternalLink,
  Trash2,
  Check,
  Star,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { Milestone, TrialAttempt, MilestoneStatus } from '../../types';
import { GraphicalSpecimen } from '../graphical/GraphicalSpecimen';

interface SubtopicMiniPageProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
  onTriggerConfetti: () => void;
}

type MiniPageTab = 'criteria' | 'protocol' | 'graphical' | 'practice' | 'trials';

export const SubtopicMiniPage: React.FC<SubtopicMiniPageProps> = ({
  milestone,
  isOpen,
  onClose,
  onTriggerConfetti,
}) => {
  const {
    toggleMilestoneStatus,
    updateMilestone,
    toggleChecklistItem,
    addTrialAttempt,
    deleteTrialAttempt,
    learningMode,
  } = useDesign();

  const [activeTab, setActiveTab] = useState<MiniPageTab>('criteria');
  const [explanationLevel, setExplanationLevel] = useState<'diploma' | 'bachelor'>(learningMode || 'diploma');

  // New trial form state
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [trialVersionTitle, setTrialVersionTitle] = useState('');
  const [trialScore, setTrialScore] = useState(85);
  const [trialCritiqueNotes, setTrialCritiqueNotes] = useState('');
  const [trialLink, setTrialLink] = useState('');
  const [trialStatus, setTrialStatus] = useState<'needs-refinement' | 'passed-critique' | 'portfolio-ready'>('passed-critique');

  // Notes
  const [userNotes, setUserNotes] = useState('');

  React.useEffect(() => {
    if (milestone) {
      setUserNotes(milestone.userNotes || '');
      setShowTrialForm(false);
      setExplanationLevel(learningMode || 'diploma');
    }
  }, [milestone, learningMode]);

  if (!isOpen || !milestone) return null;

  const handleStatusChange = (newStatus: MilestoneStatus) => {
    toggleMilestoneStatus(milestone.id, newStatus);
    if (newStatus === 'completed') {
      onTriggerConfetti();
    }
  };

  const handleSaveNotes = () => {
    updateMilestone(milestone.id, { userNotes: userNotes.trim() });
  };

  const handleAddTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialVersionTitle.trim()) return;

    const currentAttemptNum = (milestone.trials?.length || 0) + 1;

    addTrialAttempt(milestone.id, {
      attemptNumber: currentAttemptNum,
      date: new Date().toISOString().split('T')[0],
      versionTitle: trialVersionTitle.trim(),
      score: Number(trialScore) || 75,
      critiqueNotes: trialCritiqueNotes.trim() || 'Iteration reviewed against academic criteria rubric.',
      fileOrLink: trialLink.trim() || 'Figma local work',
      status: trialStatus,
    });

    setTrialVersionTitle('');
    setTrialCritiqueNotes('');
    setTrialLink('');
    setShowTrialForm(false);
    onTriggerConfetti();
  };

  const completedChecklistCount = milestone.checklistItems.filter((i) => i.done).length;
  const totalChecklistCount = milestone.checklistItems.length;
  const checklistPercentage = totalChecklistCount > 0 ? Math.round((completedChecklistCount / totalChecklistCount) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      
      {/* Animated Mini Page Card */}
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Phase {milestone.phaseId}</span>
              <span>·</span>
              <span>{milestone.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" /> {milestone.estimatedHours}h syllabus unit
              </span>
              <span>·</span>
              <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                {milestone.trials?.length || 0} trial attempts
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {milestone.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Status Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => handleStatusChange('not-started')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  milestone.status === 'not-started'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                Not Started
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                  milestone.status === 'in-progress'
                    ? 'bg-amber-600 text-white'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Play className="w-3 h-3" /> In Progress
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                  milestone.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Check className="w-3 h-3" /> Completed
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Progress Bar for Checklist micro-tasks */}
        <div className="px-6 py-2 bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/30 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-900 dark:text-blue-300">
              Subtopic Checklist Coverage:
            </span>
            <span className="font-mono text-blue-700 dark:text-blue-400">
              {completedChecklistCount}/{totalChecklistCount} tasks completed ({checklistPercentage}%)
            </span>
          </div>
          <div className="w-32 bg-blue-200 dark:bg-blue-900/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${checklistPercentage}%` }}
            />
          </div>
        </div>

        {/* Mini Page Tab Navigation */}
        <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex space-x-1 sm:space-x-4 overflow-x-auto shrink-0">
          {[
            { id: 'criteria' as MiniPageTab, label: 'Work Criteria & Rubric', icon: Award },
            { id: 'protocol' as MiniPageTab, label: 'Studio Interaction Protocol', icon: BookOpen },
            { id: 'graphical' as MiniPageTab, label: 'Graphical Specimen', icon: Layers },
            { id: 'practice' as MiniPageTab, label: 'Practice & YouTube Links', icon: Video },
            { id: 'trials' as MiniPageTab, label: `Trial Attempts (${milestone.trials?.length || 0})`, icon: RotateCw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-2 text-xs font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: WORK CRITERIA & RUBRIC */}
          {activeTab === 'criteria' && (
            <div className="space-y-6">
              
              {/* Explanation Level Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Explanation Level:
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Switch between simple diploma language and academic degree standards
                  </span>
                </div>

                <div className="flex p-0.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setExplanationLevel('diploma')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      explanationLevel === 'diploma'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    🎓 Diploma Mode (Simple & Plain English)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplanationLevel('bachelor')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      explanationLevel === 'bachelor'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    🏛️ Bachelor Mode (Academic Rubric)
                  </button>
                </div>
              </div>

              {/* DIPLOMA MODE (SIMPLE & PLAIN ENGLISH) */}
              {explanationLevel === 'diploma' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Plain English Card */}
                  <div className="p-5 rounded-2xl bg-linear-to-br from-blue-50/80 via-white to-blue-50/40 dark:from-blue-950/30 dark:via-zinc-900 dark:to-blue-950/10 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎓</span>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                          In Plain English (The 1-Minute Diploma Breakdown)
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        Zero Jargon
                      </span>
                    </div>

                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                      {milestone.workCriteria.simpleExplanation || milestone.shortDesc}
                    </p>

                    {/* Real-World Analogy */}
                    {milestone.workCriteria.simpleAnalogy && (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-blue-100 dark:border-blue-900/40 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
                        <span className="text-xl shrink-0 mt-0.5">💡</span>
                        <div className="space-y-0.5">
                          <strong className="block text-zinc-900 dark:text-zinc-100 font-bold">
                            Simple Real-World Analogy:
                          </strong>
                          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {milestone.workCriteria.simpleAnalogy}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* The 1 Golden Rule */}
                    {milestone.workCriteria.goldenRule && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 flex items-center gap-2.5 font-bold">
                        <span className="text-base">⭐</span>
                        <span>Golden Rule to Remember: {milestone.workCriteria.goldenRule}</span>
                      </div>
                    )}
                  </div>

                  {/* Beginner Action Steps */}
                  <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      How to Complete this on Your Laptop (Beginner Step-by-Step)
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">Step 1 · Look First</span>
                        <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Find 2 Clean Examples</h5>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          Look at popular websites or brand logos. Notice how they handle this exact principle.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">Step 2 · Sketch 5 mins</span>
                        <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Doodle on Paper</h5>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          Do not jump to software yet! Scribble 3 quick ideas on paper to clear your mind.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">Step 3 · Laptop Practice</span>
                        <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Create & Verify</h5>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          Open Figma/Photopea. Build your exercise and check off the task boxes below.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Beginner Mistakes */}
                  <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300">
                        Beginner Traps to Avoid
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-800 dark:text-zinc-200 pl-4 list-disc">
                      {milestone.workCriteria.commonPitfalls.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* BACHELOR MODE (ACADEMIC RUBRIC) */}
              {explanationLevel === 'bachelor' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Bachelor Standard Statement */}
                  <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
                        Bachelor Degree Evaluation Benchmark
                      </span>
                    </div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {milestone.workCriteria.bachelorStandard}
                    </p>
                  </div>

                  {/* Rubric Points Table */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Academic Grading Rubric Criteria
                    </h3>

                    <div className="space-y-3">
                      {milestone.workCriteria.rubric.map((r, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                              {r.title}
                            </span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                              Criterion #{i + 1}
                            </span>
                          </div>
                          <p className="text-zinc-700 dark:text-zinc-300">
                            {r.criteria}
                          </p>
                          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-start gap-1.5 text-zinc-600 dark:text-zinc-400">
                            <span className="font-semibold text-purple-600 dark:text-purple-400">Examiner Benchmark:</span>
                            <span>{r.benchmark}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Novice Pitfalls */}
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Common Pitfalls to Avoid in Studio
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-800 dark:text-zinc-200 pl-4 list-disc">
                      {milestone.workCriteria.commonPitfalls.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: STUDIO INTERACTION PROTOCOL */}
          {activeTab === 'protocol' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How a University Graphic Design & UI/UX Student Interacts with this Syllabus
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Follow this 4-step studio methodology for every project to cultivate industry-standard thinking.
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    01
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      Step 1: Theoretical Analysis & Deconstruction
                    </h4>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {milestone.interactionProtocol.step1_theoryDeconstruct}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    02
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      Step 2: Rapid Analog Thumbnailing on Paper
                    </h4>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {milestone.interactionProtocol.step2_analogThumbnailing}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    03
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      Step 3: Digital Execution & Vector Math on Laptop
                    </h4>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {milestone.interactionProtocol.step3_digitalExecution}
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    04
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      Step 4: Studio Peer Critique & Objective Verification
                    </h4>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {milestone.interactionProtocol.step4_studioCritique}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GRAPHICAL SPECIMEN */}
          {activeTab === 'graphical' && (
            <div className="space-y-6">
              <GraphicalSpecimen example={milestone.graphicalExample} />
            </div>
          )}

          {/* TAB 4: PRACTICE GUIDE & YOUTUBE REFERRALS */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              {/* Artboard & Software Workflow */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Laptop Artboard Setup & Step-by-Step Execution
                </h3>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700 text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Artboard Geometry:</span>{' '}
                  <span className="font-mono text-blue-600 dark:text-blue-400">{milestone.practiceGuide.artboardSetup}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Execution Workflow Steps:
                  </span>
                  <ol className="space-y-1.5 text-xs text-zinc-800 dark:text-zinc-200 pl-4 list-decimal">
                    {milestone.practiceGuide.softwareWorkflow.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Shortcuts */}
                <div>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Essential Keyboard Shortcuts:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.practiceGuide.keyShortcuts.map((sc, i) => (
                      <kbd key={i} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px] text-zinc-800 dark:text-zinc-200">
                        {sc}
                      </kbd>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Deliverable Spec:</span>{' '}
                  <span className="text-zinc-600 dark:text-zinc-400">{milestone.practiceGuide.deliverableSpec}</span>
                </div>
              </div>

              {/* YouTube Tutorial Referrals */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Curated University YouTube Video Lectures
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {milestone.youtubeReferences.map((yt, i) => (
                    <a
                      key={i}
                      href={yt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 group transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-red-600 dark:text-red-400">{yt.channel}</span>
                          <span className="font-mono text-zinc-400">{yt.focusArea}</span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {yt.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          {yt.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        <span>Open tutorial on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TRIAL ATTEMPTS & CRITIQUES */}
          {activeTab === 'trials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Trial Iterations & Critique Tracker
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Log each attempt (V1, V2, V3) and record self-critique scores against the academic rubric.
                  </p>
                </div>

                <button
                  onClick={() => setShowTrialForm(!showTrialForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log New Trial Attempt</span>
                </button>
              </div>

              {/* Form to log new trial */}
              {showTrialForm && (
                <form
                  onSubmit={handleAddTrialSubmit}
                  className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 space-y-3 animate-in fade-in duration-150"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Iteration Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. V3 - Refined kerning and balanced stroke weight"
                        value={trialVersionTitle}
                        onChange={(e) => setTrialVersionTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Rubric Score (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={trialScore}
                          onChange={(e) => setTrialScore(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Status
                        </label>
                        <select
                          value={trialStatus}
                          onChange={(e) => setTrialStatus(e.target.value as any)}
                          className="w-full px-2 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                        >
                          <option value="needs-refinement">Needs Refinement</option>
                          <option value="passed-critique">Passed Critique</option>
                          <option value="portfolio-ready">Portfolio Ready</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Critique Notes & Feedback
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What was improved in this version? What still needs tightening?"
                      value={trialCritiqueNotes}
                      onChange={(e) => setTrialCritiqueNotes(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      File Reference / Link (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. figma.com/file/... or local folder name"
                      value={trialLink}
                      onChange={(e) => setTrialLink(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowTrialForm(false)}
                      className="px-3 py-1.5 text-xs rounded text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      Save Trial Iteration
                    </button>
                  </div>
                </form>
              )}

              {/* Trials list */}
              <div className="space-y-3">
                {(!milestone.trials || milestone.trials.length === 0) ? (
                  <div className="p-8 text-center text-xs text-zinc-500 border border-dashed rounded-xl dark:border-zinc-800">
                    No trial iterations recorded yet. University students typically iterate 2 to 3 times before finalizing.
                  </div>
                ) : (
                  milestone.trials.map((trial) => (
                    <div
                      key={trial.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                            Attempt #{trial.attemptNumber}
                          </span>
                          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                            {trial.versionTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                            Score: {trial.score}/100
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            trial.status === 'portfolio-ready'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : trial.status === 'passed-critique'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {trial.status.replace('-', ' ')}
                          </span>
                          <button
                            onClick={() => deleteTrialAttempt(milestone.id, trial.id)}
                            className="p-1 text-zinc-400 hover:text-rose-500"
                            title="Delete trial record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">
                        "{trial.critiqueNotes}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <span>Logged: {trial.date}</span>
                        {trial.fileOrLink && (
                          <span className="font-mono text-zinc-500">{trial.fileOrLink}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Subtopic Checklist Section (Visible across all tabs at bottom) */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Subtopic Checklist Micro-Tasks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {milestone.checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(milestone.id, item.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                    item.done
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300'
                      : 'bg-white dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    item.done
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-zinc-300 dark:border-zinc-600'
                  }`}>
                    {item.done && <Check className="w-3 h-3" />}
                  </div>
                  <span className={item.done ? 'line-through opacity-80' : ''}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Personal Reflection Notes */}
          <div className="pt-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Personal Study Journal & Critique Takeaways
            </label>
            <textarea
              rows={2}
              placeholder="Record your personal notes, questions for tutors, or software revelations..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              onBlur={handleSaveNotes}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Real-time offline persistence · Auto-saved to browser
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
