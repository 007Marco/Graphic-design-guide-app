import React, { useState } from 'react';
import { GraphicalExample } from '../../types';
import { Eye, Layers, Check, Sliders } from 'lucide-react';

interface GraphicalSpecimenProps {
  example: GraphicalExample;
}

export const GraphicalSpecimen: React.FC<GraphicalSpecimenProps> = ({ example }) => {
  // Interactive state for specimens
  const [showGuides, setShowGuides] = useState(true);
  const [activeAnatomyPart, setActiveAnatomyPart] = useState<string | null>('x-height');
  const [scaleMultiplier, setScaleMultiplier] = useState(1.25);
  const [iconKeyline, setIconKeyline] = useState<'all' | 'circle' | 'square'>('all');

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 overflow-hidden shadow-xs">
      
      {/* Specimen Header Bar */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            Interactive Graphical Specimen & Academic Blueprint
          </span>
        </div>

        <button
          onClick={() => setShowGuides(!showGuides)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
            showGuides
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showGuides ? 'Guides Active' : 'Hide Guides'}</span>
        </button>
      </div>

      {/* Interactive Render Area based on type */}
      <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/50 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
        
        {/* 1. Typographic Anatomy */}
        {example.type === 'typography-anatomy' && (
          <div className="w-full max-w-xl">
            <div className="relative py-12 px-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs select-none">
              
              {/* Guides */}
              {showGuides && (
                <>
                  {/* Ascender line */}
                  <div className="absolute top-[28px] inset-x-4 border-b border-rose-400/80 dark:border-rose-500/80 border-dashed flex justify-between">
                    <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 -translate-y-4">Ascender (720 units)</span>
                  </div>
                  {/* Cap Height line */}
                  <div className="absolute top-[52px] inset-x-4 border-b border-indigo-400/80 dark:border-indigo-500/80 border-dashed flex justify-between">
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 -translate-y-4">Cap Height (660 units)</span>
                  </div>
                  {/* Meanline / x-height */}
                  <div className="absolute top-[92px] inset-x-4 border-b border-amber-400/80 dark:border-amber-500/80 border-dashed flex justify-between">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 -translate-y-4">Meanline / x-height (500 units)</span>
                  </div>
                  {/* Baseline */}
                  <div className="absolute top-[152px] inset-x-4 border-b-2 border-blue-500 dark:border-blue-400 flex justify-between">
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 translate-y-1">Baseline (0 units)</span>
                  </div>
                  {/* Descender line */}
                  <div className="absolute top-[188px] inset-x-4 border-b border-purple-400/80 dark:border-purple-500/80 border-dashed flex justify-between">
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 translate-y-1">Descender (-220 units)</span>
                  </div>
                </>
              )}

              {/* Glyphs */}
              <div className="text-center font-serif text-7xl tracking-widest text-zinc-900 dark:text-zinc-100 relative z-10 leading-none">
                <span className="inline-block relative">
                  H
                </span>
                <span className="inline-block relative text-blue-600 dark:text-blue-400">
                  g
                </span>
                <span className="inline-block relative">
                  k
                </span>
                <span className="inline-block relative text-amber-600 dark:text-amber-400">
                  y
                </span>
                <span className="inline-block relative">
                  Q
                </span>
              </div>
            </div>

            {/* Anatomy Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
              {[
                { id: 'baseline', label: 'Baseline', color: 'text-blue-600' },
                { id: 'x-height', label: 'x-Height', color: 'text-amber-600' },
                { id: 'cap-height', label: 'Cap Height', color: 'text-indigo-600' },
                { id: 'ascender', label: 'Ascender', color: 'text-rose-600' },
                { id: 'descender', label: 'Descender', color: 'text-purple-600' },
                { id: 'counter', label: 'Counter Space', color: 'text-emerald-600' },
              ].map((part) => (
                <button
                  key={part.id}
                  onClick={() => setActiveAnatomyPart(part.id)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                    activeAnatomyPart === part.id
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Modular Type Scale */}
        {example.type === 'modular-scale' && (
          <div className="w-full max-w-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="text-zinc-500">Live Mathematical Progression:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-700 dark:text-zinc-300">Ratio: {scaleMultiplier}</span>
                <select
                  value={scaleMultiplier}
                  onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))}
                  className="px-2 py-0.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value={1.20}>1.200 (Minor Third)</option>
                  <option value={1.25}>1.250 (Major Third)</option>
                  <option value={1.333}>1.333 (Perfect Fourth)</option>
                  <option value={1.618}>1.618 (Golden Ratio)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {[
                { name: 'Display Heading', power: 3, label: 'Hero statement' },
                { name: 'H1 Section Header', power: 2, label: 'Primary topic' },
                { name: 'H2 Subheading', power: 1, label: 'Secondary anchor' },
                { name: 'Body Copy (Base)', power: 0, label: 'The quick brown fox jumps over the lazy dog.' },
                { name: 'Caption / Meta', power: -1, label: 'Figure 1.0 · Optical hierarchy specimen' },
              ].map((item) => {
                const px = Math.round(16 * Math.pow(scaleMultiplier, item.power));
                return (
                  <div key={item.name} className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
                    <span className="font-mono text-[11px] text-zinc-400 w-32 shrink-0">{item.name} ({px}px)</span>
                    <span style={{ fontSize: `${px}px` }} className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Swiss 12-Column Grid */}
        {example.type === 'swiss-grid' && (
          <div className="w-full max-w-xl">
            <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs h-[220px]">
              {/* 12-Column Red Guide Overlay */}
              {showGuides && (
                <div className="absolute inset-x-6 top-6 bottom-6 grid grid-cols-12 gap-2 pointer-events-none opacity-40">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-rose-500/15 border-x border-rose-500/30 h-full text-[9px] text-rose-500 text-center font-mono pt-1">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Asymmetric Swiss Content */}
              <div className="relative z-10 grid grid-cols-12 gap-2 h-full">
                {/* 8-col headline */}
                <div className="col-span-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Zürich Pavillon 2026</span>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight mt-1">
                      Internationale Plakatkunst & Gestalt
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm">
                    Structured asymmetrical equilibrium: Negative space active across columns 9 through 12.
                  </p>
                </div>

                {/* 4-col metadata block */}
                <div className="col-span-4 border-l border-zinc-200 dark:border-zinc-700 pl-3 flex flex-col justify-between text-[11px]">
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-100">Datum / Zeit</span>
                    <span className="text-zinc-500">12. Okt — 04. Nov</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-100">Eintritt</span>
                    <span className="text-zinc-500">CHF 15.00 / Freier Zutritt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Bezier Curves Specimen */}
        {example.type === 'bezier-curves' && (
          <div className="w-full max-w-xl flex flex-col items-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-md h-[180px] bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2">
              {/* Construction guide lines */}
              {showGuides && (
                <>
                  <line x1="80" y1="140" x2="80" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="320" y1="140" x2="320" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="200" y1="40" x2="120" y2="40" stroke="#3b82f6" strokeWidth="1.5" />
                  <line x1="200" y1="40" x2="280" y2="40" stroke="#3b82f6" strokeWidth="1.5" />
                  
                  {/* Tangent control handle circles */}
                  <circle cx="120" cy="40" r="4" fill="#3b82f6" />
                  <circle cx="280" cy="40" r="4" fill="#3b82f6" />
                  <text x="120" y="28" fill="#3b82f6" fontSize="9" textAnchor="middle" fontFamily="monospace">Handle Left (90°)</text>
                  <text x="280" y="28" fill="#3b82f6" fontSize="9" textAnchor="middle" fontFamily="monospace">Handle Right (90°)</text>
                </>
              )}

              {/* The Smooth Bezier Curve Path */}
              <path
                d="M 80,140 C 80,40 120,40 200,40 C 280,40 320,40 320,140"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* Anchor Nodes at Extrema */}
              <rect x="76" y="136" width="8" height="8" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="196" y="36" width="8" height="8" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="316" y="136" width="8" height="8" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />

              <text x="200" y="58" fill="#18181b" fontSize="10" fontWeight="bold" textAnchor="middle">Top Extrema Node (0°, 90°)</text>
            </svg>
            <span className="text-[11px] text-zinc-500 mt-2 font-mono">
              Green = Cubic Bezier Curve · Blue = Balanced Tangent Handles · Black = Extrema Anchor Nodes
            </span>
          </div>
        )}

        {/* 5. Color Contrast Specimen */}
        {example.type === 'color-contrast' && (
          <div className="w-full max-w-xl grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-zinc-950 text-white border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400">WCAG AAA · 14.8:1 Ratio</span>
              <h4 className="text-sm font-bold">High Luminance Text</h4>
              <p className="text-xs text-zinc-300">
                Pure high-contrast text on 60% dark surface ensures zero optical eye strain.
              </p>
              <div className="flex gap-2 pt-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-600 text-white font-semibold">10% Accent CTA</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300">30% Secondary</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400">60-30-10 System</span>
              <h4 className="text-sm font-bold">Light Canvas Surface</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Deep charcoal typography (#18181B) provides superior tactile feel over pure #000000.
              </p>
              <div className="flex gap-2 pt-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-600 text-white font-semibold">Accent CTA</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">Secondary</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. 24px Icon Grid */}
        {example.type === 'icon-grid' && (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 240 240" className="w-48 h-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
              {/* Grid 10x scale */}
              {showGuides && (
                <>
                  {/* Outer 24px boundary */}
                  <rect x="0" y="0" width="240" height="240" fill="none" stroke="#e4e4e7" strokeWidth="1" />
                  {/* 2px Safe zone padding */}
                  <rect x="20" y="20" width="200" height="200" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" />
                  {/* Keyline circle */}
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Keyline square */}
                  <rect x="40" y="40" width="160" height="160" rx="20" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Center axes */}
                  <line x1="120" y1="0" x2="120" y2="240" stroke="#71717a" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="0" y1="120" x2="240" y2="120" stroke="#71717a" strokeWidth="0.5" strokeDasharray="2 2" />
                </>
              )}

              {/* Sample Home Icon on 24px grid */}
              <path
                d="M 50,130 L 120,60 L 190,130 L 190,190 L 140,190 L 140,150 L 100,150 L 100,190 L 50,190 Z"
                fill="none"
                stroke="#18181b"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-zinc-100"
              />
            </svg>
            <span className="text-[11px] text-zinc-500 mt-2 font-mono">
              Red Dash = 2px Safe Padding · Blue Circle = Keyline Arc · Black = 2px Vector Stroke
            </span>
          </div>
        )}

        {/* 7. UI Components */}
        {example.type === 'ui-components' && (
          <div className="w-full max-w-md space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1.5">Default State</span>
                <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
                  Primary Button
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1.5">Hover State</span>
                <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-sm scale-102 transition-transform">
                  Primary Button
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1.5">Focus-Visible (3:1)</span>
                <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white ring-4 ring-blue-500/50 outline-none">
                  Focused Ring
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1.5">Disabled State</span>
                <button disabled className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed">
                  Disabled Action
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Specimen Caption & Key Principles */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
          {example.caption}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-zinc-500">Key Principles:</span>
          {example.keyPrinciples.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Check className="w-3 h-3 text-emerald-500" />
              {p}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
