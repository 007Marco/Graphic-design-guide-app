import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Circle,
  Play,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Award,
  RotateCw,
  Check,
  Layers,
  Sparkles,
  GraduationCap,
  Smartphone,
  HelpCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { DEFAULT_PHASES } from '../../data/curriculumData';
import { Milestone, MilestoneStatus, DesignCategory } from '../../types';

interface RoadmapViewProps {
  onOpenSubtopicMiniPage: (m: Milestone) => void;
  onOpenCustomMilestoneModal: (defaultPhaseId?: number) => void;
  onTriggerConfetti: () => void;
  onOpenPhoneModal?: () => void;
}

const CATEGORIES: DesignCategory[] = [
  'Typography',
  'Color Theory',
  'Layout & Grid',
  'Vector & Pen Tool',
  'Brand Identity',
  'Editorial & Print',
  'UI/UX & Design Systems',
  'Portfolio & Delivery',
];

// Plain-English dictionary for diploma students
interface GlossaryTerm {
  term: string;
  simpleMeaning: string;
  analogy: string;
  whyItMatters: string;
}

const DIPLOMA_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Kerning',
    simpleMeaning: 'Fixing the awkward gaps between two individual letters in a title or logo.',
    analogy: 'Like shifting two people on a park bench so they aren’t sitting uncomfortably far apart or squished together.',
    whyItMatters: 'Bad kerning makes words look broken into random syllables (e.g. "W A LK").',
  },
  {
    term: 'Leading (Line Height)',
    simpleMeaning: 'The vertical breathing room between lines of text in a paragraph.',
    analogy: 'Like the ceiling height in a room. If the ceiling is too low, you feel claustrophobic and bump your head.',
    whyItMatters: 'If lines are too close, descending letters (g, y, p) collide with tall letters (h, b, d).',
  },
  {
    term: 'Tracking',
    simpleMeaning: 'The overall spacing across an entire sentence or word (unlike kerning, which is between just 2 letters).',
    analogy: 'Zooming out the whole row of parked cars together so they all have equal breathing space.',
    whyItMatters: 'Small ALL-CAPS text needs extra tracking to be readable; giant headlines often need tighter tracking.',
  },
  {
    term: 'Hierarchy',
    simpleMeaning: 'Making the most important element biggest and boldest so the viewer knows where to look first.',
    analogy: 'A newspaper front page: Huge Headline -> Medium Subtitle -> Regular Body text.',
    whyItMatters: 'Without hierarchy, everything screams for attention at the same time and the viewer leaves.',
  },
  {
    term: 'Vector vs. Raster',
    simpleMeaning: 'Vectors are drawn with math lines that NEVER get blurry at any size; Rasters are photos made of pixels that get blurry if stretched.',
    analogy: 'Vector is like a blueprint formula; Raster is like a photograph of the building made of mosaic tiles.',
    whyItMatters: 'Logos MUST be vectors so they can print on a business card or a giant skyscraper billboard with zero blur.',
  },
  {
    term: 'Color Contrast & WCAG',
    simpleMeaning: 'Ensuring your text color is clearly different from your background color so anyone can read it easily.',
    analogy: 'Wearing a bright yellow vest at night vs wearing dark navy blue in the dark.',
    whyItMatters: 'Light gray text on white might look "fancy" to a beginner, but 90% of users cannot read it in bright daylight.',
  },
  {
    term: '60-30-10 Color Rule',
    simpleMeaning: '60% background neutral, 30% card/box secondary color, 10% bright focal button color.',
    analogy: 'A tuxedo: 60% black jacket, 30% crisp white shirt, 10% bright red bow tie that pops.',
    whyItMatters: 'Stops you from creating chaotic rainbow designs where users do not know which button to click.',
  },
  {
    term: 'White Space (Negative Space)',
    simpleMeaning: 'Clean, empty breathing room around text and images.',
    analogy: 'Silence in music. If an orchestra plays every instrument at max volume without pausing, it is noise, not a song.',
    whyItMatters: 'Empty space makes designs look high-end, uncluttered, and trustworthy.',
  },
  {
    term: 'Bleed (in Print)',
    simpleMeaning: 'Extending your background artwork 3mm past the edge of the paper page.',
    analogy: 'Rolling dough slightly wider than your pie dish so when you trim the crust, no raw counter shows.',
    whyItMatters: 'When the industrial paper cutter slices 500 flyers, slight blade shift will leave ugly white edges without bleed.',
  },
  {
    term: 'DPI & Resolution',
    simpleMeaning: '72 DPI is for laptop/phone screens; 300 DPI is for sharp, crisp printed paper.',
    analogy: 'Threads in a luxury bedsheet: more threads per inch = tighter, silkier, crisper result.',
    whyItMatters: 'Printing a 72 DPI web image onto paper results in jagged, blurry pixels.',
  },
  {
    term: 'UI vs. UX',
    simpleMeaning: 'UI (User Interface) is how it looks (colors, fonts, buttons); UX (User Experience) is how easily it works for a human.',
    analogy: 'A teapot: UI is the pretty painted flowers on the ceramic; UX is that the handle doesn’t burn your hand when pouring tea.',
    whyItMatters: 'A gorgeous app that is confusing to click will fail; good design requires both pretty UI and easy UX.',
  },
  {
    term: 'Bezier Curve',
    simpleMeaning: 'The smooth curve created by the Pen Tool using two anchor dots and pulling the little control handles.',
    analogy: 'Bending a flexible plastic wire between two pegs to make a smooth arch.',
    whyItMatters: 'Mastering the Pen Tool is what separates professional vector designers from amateur button-pushers.',
  },
];

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  onOpenSubtopicMiniPage,
  onOpenCustomMilestoneModal,
  onTriggerConfetti,
  onOpenPhoneModal,
}) => {
  const {
    state,
    toggleMilestoneStatus,
    overallCoveragePercentage,
    phaseCoverageMetrics,
    totalTrialsLogged,
    learningMode,
    setLearningMode,
  } = useDesign();

  // Accordion open/collapse state per phase (default all open)
  const [collapsedPhases, setCollapsedPhases] = useState<Record<number, boolean>>({});

  const [statusFilter, setStatusFilter] = useState<MilestoneStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<DesignCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Plain-English Glossary drawer
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState('');

  const togglePhaseCollapse = (phaseId: number) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const collapseAll = () => {
    const allCollapsed: Record<number, boolean> = {};
    DEFAULT_PHASES.forEach((p) => {
      allCollapsed[p.id] = true;
    });
    setCollapsedPhases(allCollapsed);
  };

  const expandAll = () => {
    setCollapsedPhases({});
  };

  const handleToggleStatus = (m: Milestone, e: React.MouseEvent) => {
    e.stopPropagation();
    if (m.status !== 'completed') {
      toggleMilestoneStatus(m.id, 'completed');
      onTriggerConfetti();
    } else {
      toggleMilestoneStatus(m.id, 'not-started');
    }
  };

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    return state.milestones.filter((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(query);
        const matchesDesc = m.shortDesc.toLowerCase().includes(query);
        const matchesStandard = m.workCriteria.bachelorStandard.toLowerCase().includes(query);
        const matchesSimple = m.workCriteria.simpleExplanation?.toLowerCase().includes(query);
        const matchesDeliverable = m.practiceGuide.deliverableSpec.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesStandard && !matchesSimple && !matchesDeliverable) return false;
      }
      return true;
    });
  }, [state.milestones, statusFilter, categoryFilter, searchQuery]);

  const filteredGlossary = useMemo(() => {
    if (!glossarySearch.trim()) return DIPLOMA_GLOSSARY;
    const q = glossarySearch.toLowerCase();
    return DIPLOMA_GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.simpleMeaning.toLowerCase().includes(q) ||
        g.analogy.toLowerCase().includes(q)
    );
  }, [glossarySearch]);

  // Friendly diploma subtitles
  const getPhaseSubtitle = (phaseId: number) => {
    if (learningMode === 'diploma') {
      switch (phaseId) {
        case 1:
          return 'The ABCs: Fonts, Colors & Spacing';
        case 2:
          return 'Drawing Anything Clean with the Pen Tool';
        case 3:
          return 'Designing Logos & Brand Kits People Remember';
        case 4:
          return 'Posters, Flyers & Files Ready to Print';
        case 5:
          return 'Designing Apps & Websites People Love Using';
        case 6:
          return 'Showing Your Best Work & Getting Paid Clients';
        default:
          return 'Core Design Practical Skills';
      }
    }
    const phase = DEFAULT_PHASES.find((p) => p.id === phaseId);
    return phase ? phase.subtitle : 'Studio Track';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Diploma Mode Toggle & Progress */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {learningMode === 'diploma' ? 'Diploma Practical Curriculum' : 'Bachelor Master Curriculum'}
              </span>
              <span>·</span>
              <span className="text-zinc-500 font-medium">Home Studio Track</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {learningMode === 'diploma'
                ? 'Graphic Design & UI/UX Plain-English Syllabus'
                : 'Bachelor Degree Design Syllabus & Studio Rubric'}
            </h2>
            
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {learningMode === 'diploma'
                ? 'Simplified for home learners on a laptop. Every subtopic includes plain English breakdowns, everyday analogies, the #1 golden rule, free laptop tools, and YouTube lessons.'
                : 'University-accredited evaluation rubrics, Swiss grid theory, Bezier mathematics, and professional case study methodologies.'}
            </p>
          </div>

          {/* Action Row: Mode Switcher & Dictionary */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {/* Diploma vs Bachelor Mode Switcher */}
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs">
              <button
                type="button"
                onClick={() => setLearningMode('diploma')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  learningMode === 'diploma'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span>🎓 Diploma Mode</span>
                <span className="text-[10px] opacity-80">(Plain English)</span>
              </button>
              <button
                type="button"
                onClick={() => setLearningMode('bachelor')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  learningMode === 'bachelor'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span>🏛️ Bachelor Mode</span>
                <span className="text-[10px] opacity-80">(Academic)</span>
              </button>
            </div>

            {/* Plain English Glossary Button */}
            <button
              onClick={() => setShowGlossary(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Design Terms Dictionary</span>
            </button>

            {/* Phone Button */}
            {onOpenPhoneModal && (
              <button
                onClick={onOpenPhoneModal}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open on Phone</span>
              </button>
            )}

            <button
              onClick={() => onOpenCustomMilestoneModal(1)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Custom Subtopic</span>
            </button>
          </div>
        </div>

        {/* Coverage Tracker KPI Bar */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block mb-1">Overall Syllabus Coverage:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                {overallCoveragePercentage}%
              </span>
              <span className="text-zinc-500">completed</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallCoveragePercentage}%` }}
              />
            </div>
          </div>

          <div>
            <span className="text-zinc-500 block mb-1">Finished Subtopics:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                {state.milestones.filter((m) => m.status === 'completed').length} / {state.milestones.length}
              </span>
              <span className="text-zinc-500">core units</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Fonts, colors, vectors, layouts, logos & UI
            </p>
          </div>

          <div>
            <span className="text-zinc-500 block mb-1">Practice Attempts (Trials):</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {totalTrialsLogged}
              </span>
              <span className="text-zinc-500">versions logged</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {learningMode === 'diploma'
                ? 'Practice makes perfect — log your drafts!'
                : 'Studio standard: 2+ iteration cycles per unit'}
            </p>
          </div>
        </div>
      </div>

      {/* Helpful Mobile Banner */}
      {onOpenPhoneModal && (
        <div className="p-4 rounded-xl bg-linear-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-blue-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                Study from your phone while designing in Figma on your laptop!
              </span>
              <span className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                Scan the QR code to check off tasks in bed, on the bus, or next to your computer screen. Works 100% offline.
              </span>
            </div>
          </div>
          <button
            onClick={onOpenPhoneModal}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            Show Phone QR Code →
          </button>
        </div>
      )}

      {/* Filter and Accordion Control Bar */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={
              learningMode === 'diploma'
                ? 'Search simple words (e.g. fonts, colors, pen tool)...'
                : 'Search criteria, YouTube links, or topics...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Status:</span>
            {(['all', 'not-started', 'in-progress', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-medium'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {st === 'all' ? 'All' : st.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="px-2 py-1 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            >
              <option value="all">All Topics</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Expand/Collapse All */}
          <div className="flex items-center gap-1">
            <button
              onClick={expandAll}
              className="px-2 py-1 text-[11px] rounded text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <button
              onClick={collapseAll}
              className="px-2 py-1 text-[11px] rounded text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Phase Blocks */}
      <div className="space-y-4">
        {DEFAULT_PHASES.map((phase) => {
          const isCollapsed = !!collapsedPhases[phase.id];
          const phaseItems = filteredMilestones.filter((m) => m.phaseId === phase.id);
          const phaseMetric = phaseCoverageMetrics.find((p) => p.phaseId === phase.id);

          return (
            <div
              key={phase.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-shadow"
            >
              {/* Collapsible Accordion Header */}
              <div
                onClick={() => togglePhaseCollapse(phase.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors select-none"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Phase 0{phase.id}
                      </span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                        {getPhaseSubtitle(phase.id)}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {phase.title.split(':')[1]?.trim() || phase.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Phase Coverage Stats on Header */}
                <div className="flex items-center gap-6 sm:justify-end shrink-0 text-xs">
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                      {phaseMetric?.percentage || 0}% Done
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {phaseMetric?.completedSubtopics || 0}/{phaseMetric?.totalSubtopics || 0} subtopics completed
                    </span>
                  </div>

                  <div className="w-28 bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${phaseMetric?.percentage || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Collapsible Content Body */}
              {!isCollapsed && (
                <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 animate-in fade-in duration-200">
                  {phaseItems.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-500">
                      No subtopics in this phase match your active filters.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {phaseItems.map((milestone) => {
                        const isCompleted = milestone.status === 'completed';
                        const isInProgress = milestone.status === 'in-progress';
                        const completedChecks = milestone.checklistItems.filter((i) => i.done).length;
                        const totalChecks = milestone.checklistItems.length;

                        return (
                          <div
                            key={milestone.id}
                            onClick={() => onOpenSubtopicMiniPage(milestone)}
                            className={`group p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isCompleted
                                ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200/60 dark:border-emerald-900/40 hover:border-emerald-300'
                                : isInProgress
                                ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-200/60 dark:border-amber-900/40 hover:border-amber-300'
                                : 'bg-zinc-50/40 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Meta & Status Button */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    {milestone.category}
                                  </span>
                                  <span>·</span>
                                  <span className="font-mono">~{milestone.estimatedHours}h on laptop</span>
                                  {milestone.trials && milestone.trials.length > 0 && (
                                    <>
                                      <span>·</span>
                                      <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold">
                                        {milestone.trials.length} draft{milestone.trials.length === 1 ? '' : 's'}
                                      </span>
                                    </>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleToggleStatus(milestone, e)}
                                  className="text-zinc-400 hover:text-emerald-500 transition-colors p-0.5 cursor-pointer"
                                  title={isCompleted ? 'Mark as Not Started' : 'Mark as Completed'}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                                  ) : isInProgress ? (
                                    <Play className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-amber-950/50" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>
                              </div>

                              {/* Title */}
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {milestone.title}
                              </h4>

                              {/* DIPLOMA MODE HIGHLIGHT (SIMPLE & PLAIN ENGLISH) */}
                              {learningMode === 'diploma' ? (
                                <div className="space-y-2">
                                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-zinc-800 dark:text-zinc-200">
                                    <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 text-[11px] mb-1">
                                      <span>🎓 In Plain English:</span>
                                    </div>
                                    <p className="leading-relaxed">
                                      {milestone.workCriteria.simpleExplanation || milestone.shortDesc}
                                    </p>

                                    {/* Everyday Analogy */}
                                    {milestone.workCriteria.simpleAnalogy && (
                                      <div className="mt-2 pt-2 border-t border-blue-200/50 dark:border-blue-900/50 flex items-start gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                                        <span className="shrink-0">💡</span>
                                        <p className="italic">
                                          {milestone.workCriteria.simpleAnalogy}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* 1 Golden Rule */}
                                  {milestone.workCriteria.goldenRule && (
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-200/70 dark:border-amber-900/50">
                                      <span>⭐</span>
                                      <span className="truncate">
                                        Rule: {milestone.workCriteria.goldenRule}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* BACHELOR MODE CRITERIA HIGHLIGHT */
                                <div className="space-y-2">
                                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                    {milestone.shortDesc}
                                  </p>

                                  <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-700/60 text-xs">
                                    <div className="flex items-center gap-1.5 text-zinc-500 font-medium mb-1 text-[11px]">
                                      <Award className="w-3.5 h-3.5 text-blue-500" />
                                      <span>Academic Rubric Benchmark:</span>
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300 line-clamp-2 italic">
                                      "{milestone.workCriteria.bachelorStandard}"
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Card Footer: Checklist and Open Workbook Button */}
                            <div className="pt-3 mt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-xs">
                              <span className="font-mono text-[11px] text-zinc-500">
                                Checklist: {completedChecks}/{totalChecks} ({totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0}%)
                              </span>

                              <div className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 text-xs group-hover:translate-x-0.5 transition-transform">
                                <span>{learningMode === 'diploma' ? 'Open Easy Lesson' : 'Open Studio Mini-Page'}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PLAIN-ENGLISH DESIGN GLOSSARY MODAL / DRAWER */}
      {showGlossary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  📖
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>Diploma Plain-English Design Dictionary</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      Zero Jargon
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    What designers actually mean when they use big academic words
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGlossary(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Filter */}
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter terms (e.g. Kerning, Bleed, DPI, Vector, Hierarchy)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Terms List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {filteredGlossary.map((item) => (
                <div
                  key={item.term}
                  className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.term}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Design Principle
                    </span>
                  </div>

                  <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    {item.simpleMeaning}
                  </p>

                  <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">💡</span>
                    <div>
                      <strong>Everyday Analogy:</strong> {item.analogy}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
                    <strong>Why you need it:</strong> {item.whyItMatters}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowGlossary(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 cursor-pointer"
              >
                Close Dictionary
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
