import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { DesignCategory } from '../../types';
import { DEFAULT_PHASES } from '../../data/curriculumData';

interface CustomMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPhaseId?: number;
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

export const CustomMilestoneModal: React.FC<CustomMilestoneModalProps> = ({
  isOpen,
  onClose,
  defaultPhaseId = 1,
}) => {
  const { addCustomMilestone } = useDesign();

  const [phaseId, setPhaseId] = useState(defaultPhaseId);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DesignCategory>('Typography');
  const [shortDesc, setShortDesc] = useState('');
  const [bachelorStandard, setBachelorStandard] = useState('');
  const [deliverableSpec, setDeliverableSpec] = useState('High-resolution PDF/SVG export');
  const [toolsInput, setToolsInput] = useState('Figma, Pen Tool');
  const [estimatedHours, setEstimatedHours] = useState(4);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCustomMilestone({
      phaseId,
      title: title.trim(),
      category,
      shortDesc: shortDesc.trim() || 'Custom student-assigned syllabus unit.',
      estimatedHours: Number(estimatedHours) || 4,
      status: 'not-started',
      workCriteria: {
        bachelorStandard: bachelorStandard.trim() || 'Student-defined academic standard for creative mastery.',
        rubric: [
          {
            title: 'Conceptual Depth & Rigor',
            criteria: 'Demonstrates thorough research and formal graphic design rationale.',
            benchmark: 'Clear intentionality in layout, typography, and visual hierarchy.',
          },
        ],
        commonPitfalls: ['Rushing straight to digital execution without analog sketching.'],
      },
      interactionProtocol: {
        step1_theoryDeconstruct: 'Deconstruct exemplary references from industry masters.',
        step2_analogThumbnailing: 'Sketch minimum 4 thumbnail iterations on paper.',
        step3_digitalExecution: 'Execute production vector artwork on laptop.',
        step4_studioCritique: 'Self-evaluate against project objectives.',
      },
      practiceGuide: {
        artboardSetup: 'Figma / Illustrator 1440x900px or A4',
        softwareWorkflow: ['1. Concept research', '2. Layout drafting', '3. Polish and export'],
        keyShortcuts: ['Cmd/Ctrl + S', 'Shift + A'],
        deliverableSpec: deliverableSpec.trim(),
      },
      youtubeReferences: [
        {
          title: 'Graphic Design Masterclass & Workflow',
          channel: 'The Futur',
          description: 'University-level creative process and project execution guide.',
          url: 'https://www.youtube.com/results?search_query=the+futur+graphic+design+process',
          focusArea: 'Creative Workflow',
        },
      ],
      graphicalExample: {
        type: 'swiss-grid',
        caption: 'Custom Specimen Blueprint',
        keyPrinciples: ['Precision alignment', 'Active negative space'],
      },
      trials: [],
      checklistItems: [
        { id: `c-1`, label: 'Complete initial conceptual research and references', done: false },
        { id: `c-2`, label: 'Execute trial version on laptop', done: false },
        { id: `c-3`, label: 'Self-evaluate against academic criteria', done: false },
      ],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Add Custom Syllabus Subtopic
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Personalize your design & UI/UX roadmap with your own academic units.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Target Phase
              </label>
              <select
                value={phaseId}
                onChange={(e) => setPhaseId(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                {DEFAULT_PHASES.map((p) => (
                  <option key={p.id} value={p.id}>
                    Phase {p.id}: {p.title.split(':')[1]?.trim() || p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Discipline Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DesignCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Subtopic Title
            </label>
            <input
              type="text"
              placeholder="e.g. Design 3D isometric letterforms in Blender & Figma"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Core Objective
            </label>
            <input
              type="text"
              placeholder="What core design concept or technical capability are you mastering?"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Bachelor Degree Evaluation Benchmark (Criteria)
            </label>
            <textarea
              rows={2}
              placeholder="What criteria must this work satisfy to meet university examiner standards?"
              value={bachelorStandard}
              onChange={(e) => setBachelorStandard(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Deliverable Spec
              </label>
              <input
                type="text"
                value={deliverableSpec}
                onChange={(e) => setDeliverableSpec(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Est. Hours
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 shadow-xs"
            >
              Create Subtopic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
