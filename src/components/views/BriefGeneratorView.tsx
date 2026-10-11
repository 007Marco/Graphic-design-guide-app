import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Play,
  RotateCw,
  Clock,
  Layers,
  Palette,
  ShieldAlert,
  Plus,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { PracticeBrief, DesignCategory } from '../../types';

interface BriefGeneratorViewProps {
  onTriggerConfetti: () => void;
}

const CLIENT_NAMES = [
  { name: 'Komorebi Ceramics', industry: 'Handmade Japanese Stoneware', category: 'Brand Identity' as DesignCategory },
  { name: 'Vanguard Audio', industry: 'High-Fidelity Studio Headphones', category: 'UI/UX & Design Systems' as DesignCategory },
  { name: 'Solaris Architecture Press', industry: 'Quarterly Urbanism Journal', category: 'Editorial & Print' as DesignCategory },
  { name: 'Aether Botanicals', industry: 'Adaptogenic Mushroom Elixirs', category: 'Brand Identity' as DesignCategory },
  { name: 'Hyperion Synthesizers', industry: 'Analog Modular Instruments', category: 'Vector & Pen Tool' as DesignCategory },
  { name: 'Terra Form Studios', industry: 'Sustainable Landscape Architecture', category: 'Editorial & Print' as DesignCategory },
  { name: 'Monolith Type Foundry', industry: 'Independent Geometric Typefaces', category: 'Typography' as DesignCategory },
];

const DELIVERABLES_OPTIONS = [
  ['Primary Vector Logo mark', 'Stationery kit with letterhead and business cards', 'Color token guide'],
  ['A2 Exhibition Poster (420 x 594 mm)', 'Social media launch banner (1200 x 628)', 'Postcard print asset'],
  ['6-Slide educational carousel (1080x1350)', 'Story announcement asset', 'Custom vector icon accents'],
  ['Beverage can packaging wrap (330ml)', 'Die-line vector art', 'Photorealistic mockup composition'],
  ['Set of 8 cohesive UI icons on 24px grid', 'App store icon (1024x1024)', 'Light & dark theme test sheets'],
  ['Double-page magazine spread', 'Custom pull-quote typography lockup', 'Print-ready PDF with 3mm bleed'],
];

const CONSTRAINTS_OPTIONS = [
  ['Strictly limited to 2 ink colors and 1 single font family', 'High negative space (at least 40% open whitespace)', 'No photographic imagery'],
  ['Must be pixel-snapped to a 24px construction grid', 'Consistent 2px line weight throughout all elements', 'Tested at 16px favicon resolution'],
  ['Must use a strict Swiss 12-column baseline grid', 'CMYK print color mode with 300 DPI specifications', 'Include crop marks and fold indicators'],
  ['Warm earth-toned palette with 1 vibrant focal contrast color', 'Must feel timeless and handcrafted without vintage kitsch', 'Readable at 1 inch size'],
];

const PALETTE_OPTIONS = [
  ['#18181B', '#FAFAFA', '#E11D48'],
  ['#0F172A', '#38BDF8', '#10B981'],
  ['#292524', '#F5F5F4', '#D97706'],
  ['#1E1B4B', '#EEF2FF', '#6366F1'],
  ['#064E3B', '#ECFDF5', '#F59E0B'],
  ['#111827', '#F3F4F6', '#8B5CF6'],
];

export const BriefGeneratorView: React.FC<BriefGeneratorViewProps> = ({ onTriggerConfetti }) => {
  const { state, toggleBriefStatus, updateBrief, addCustomBrief } = useDesign();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const handleGenerateRandomBrief = () => {
    const client = CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)];
    const deliverables = DELIVERABLES_OPTIONS[Math.floor(Math.random() * DELIVERABLES_OPTIONS.length)];
    const constraints = CONSTRAINTS_OPTIONS[Math.floor(Math.random() * CONSTRAINTS_OPTIONS.length)];
    const palette = PALETTE_OPTIONS[Math.floor(Math.random() * PALETTE_OPTIONS.length)];

    const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

    addCustomBrief({
      title: `${client.name}: Design System & Identity`,
      category: client.category,
      client: `${client.name} (${client.industry})`,
      description: `A brand exploration for ${client.name}. The client requires clean, distinctive graphic assets that reflect their focus on ${client.industry.toLowerCase()}.`,
      deliverables,
      constraints,
      suggestedColors: palette,
      difficulty,
      status: 'unstarted',
    });
  };

  const handleStatusToggle = (brief: PracticeBrief) => {
    toggleBriefStatus(brief.id);
    if (brief.status === 'in-progress') {
      onTriggerConfetti();
    }
  };

  const filteredBriefs = state.briefs.filter((b) => {
    if (activeTabFilter === 'in-progress') return b.status === 'in-progress';
    if (activeTabFilter === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Design Practice Briefs
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Simulate realistic client briefs at home. Perfect for building portfolio-worthy pieces.
          </p>
        </div>

        <button
          onClick={handleGenerateRandomBrief}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 shadow-xs self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Generate New Practice Brief</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        {(['all', 'in-progress', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTabFilter(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
              activeTabFilter === tab
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {tab === 'all' ? `All Briefs (${state.briefs.length})` : tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBriefs.map((brief) => {
          const isDone = brief.status === 'completed';
          const isInProgress = brief.status === 'in-progress';

          return (
            <div
              key={brief.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/40'
                  : isInProgress
                  ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-200/60 dark:border-amber-900/40 shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{brief.category}</span>
                      <span>·</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                        {brief.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {brief.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Client: <span className="text-zinc-800 dark:text-zinc-200 font-medium">{brief.client}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleStatusToggle(brief)}
                    className="p-1 text-zinc-400 hover:text-emerald-500 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : isInProgress ? (
                      <Play className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-amber-950/50" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {brief.description}
                </p>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Required Deliverables:
                  </span>
                  <ul className="space-y-1">
                    {brief.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-zinc-800 dark:text-zinc-200 flex items-start gap-1.5">
                        <span className="text-blue-500">▪</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Design Constraints:
                  </span>
                  <ul className="space-y-1">
                    {brief.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5 italic">
                        <span className="text-zinc-400">·</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1.5">
                    Palette Inspiration:
                  </span>
                  <div className="flex items-center gap-2">
                    {brief.suggestedColors.map((hex) => (
                      <div key={hex} className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded border border-zinc-300 dark:border-zinc-700 shadow-2xs"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                        <span className="font-mono text-[10px] text-zinc-500">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  Status: <strong className="capitalize text-zinc-800 dark:text-zinc-200">{brief.status.replace('-', ' ')}</strong>
                </span>

                <button
                  onClick={() => handleStatusToggle(brief)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isInProgress
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  }`}
                >
                  {isDone ? 'Finished ✓' : isInProgress ? 'Complete Brief' : 'Start Working'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
