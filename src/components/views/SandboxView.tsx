import React, { useState } from 'react';
import {
  Palette,
  Type,
  Keyboard,
  Check,
  Copy,
} from 'lucide-react';
import { LAPTOP_SHORTCUTS } from '../../data/curriculumData';

export const SandboxView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'contrast' | 'typescale' | 'shortcuts'>('contrast');

  const [textColor, setTextColor] = useState('#18181b');
  const [bgColor, setBgColor] = useState('#f4f4f5');
  const [copiedCode, setCopiedCode] = useState(false);

  const [baseSize, setBaseSize] = useState(16);
  const [scaleRatio, setScaleRatio] = useState(1.25);

  const hexToRgb = (hex: string) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = (hex1: string, hex2: string) => {
    try {
      const rgb1 = hexToRgb(hex1);
      const rgb2 = hexToRgb(hex2);
      const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    } catch {
      return 1;
    }
  };

  const ratio = Number(calculateContrast(textColor, bgColor).toFixed(2));
  const passAANormal = ratio >= 4.5;
  const passAALarge = ratio >= 3.0;
  const passAAANormal = ratio >= 7.0;

  const typeSteps = [
    { label: 'Display Title', power: 4 },
    { label: 'Header 1', power: 3 },
    { label: 'Header 2', power: 2 },
    { label: 'Header 3', power: 1 },
    { label: 'Body Text', power: 0 },
    { label: 'Caption / Meta', power: -1 },
    { label: 'Small Footnote', power: -2 },
  ].map((step) => {
    const px = Math.round(baseSize * Math.pow(scaleRatio, step.power));
    const rem = (px / 16).toFixed(3);
    return { ...step, px, rem };
  });

  const handleCopyScaleCss = () => {
    const css = typeSteps
      .map((s) => `--font-size-${s.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}: ${s.rem}rem; /* ${s.px}px */`)
      .join('\n');
    navigator.clipboard.writeText(css);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Design Sandbox & Laptop Toolkit
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Interactive tools to test color accessibility, compute modular scales, and master shortcuts.
        </p>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTool('contrast')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTool === 'contrast'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>WCAG Contrast & Color Checker</span>
        </button>

        <button
          onClick={() => setActiveTool('typescale')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTool === 'typescale'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Modular Type Scale Calculator</span>
        </button>

        <button
          onClick={() => setActiveTool('shortcuts')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTool === 'shortcuts'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Laptop Shortcut Cheat Sheets</span>
        </button>
      </div>

      {activeTool === 'contrast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Color Contrast Pair
            </h3>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Foreground / Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-transparent"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Background Surface Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-transparent"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-500">Contrast Ratio:</span>
                <span className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  {ratio}:1
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className={`p-2 rounded border ${passAANormal ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'}`}>
                  <span className="block font-bold">AA Normal</span>
                  <span className="text-[10px]">{passAANormal ? 'Pass (≥4.5)' : 'Fail'}</span>
                </div>
                <div className={`p-2 rounded border ${passAALarge ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'}`}>
                  <span className="block font-bold">AA Large</span>
                  <span className="text-[10px]">{passAALarge ? 'Pass (≥3.0)' : 'Fail'}</span>
                </div>
                <div className={`p-2 rounded border ${passAAANormal ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'}`}>
                  <span className="block font-bold">AAA Normal</span>
                  <span className="text-[10px]">{passAAANormal ? 'Pass (≥7.0)' : 'Fail'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              style={{ backgroundColor: bgColor, color: textColor }}
              className="p-8 rounded-2xl shadow-md border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              <span className="text-xs font-semibold tracking-wider uppercase opacity-70">
                Live Type & Component Preview
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-3">
                Graphic Design & UI/UX Studio
              </h1>
              <p className="text-sm leading-relaxed max-w-lg mb-6 opacity-90">
                Visual hierarchy directs attention and tells an effortless story. When contrast is calculated accurately, users never experience fatigue reading your editorial layouts on laptop screens.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  style={{ backgroundColor: textColor, color: bgColor }}
                  className="px-4 py-2 text-xs font-bold rounded-lg shadow-sm"
                >
                  Primary CTA Button
                </button>
                <span className="text-xs opacity-75">
                  Small caption label: 12px at {ratio}:1 ratio
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'typescale' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">
                  Base Font Size (px)
                </label>
                <input
                  type="number"
                  min="12"
                  max="24"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value) || 16)}
                  className="w-24 px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">
                  Scale Ratio
                </label>
                <select
                  value={scaleRatio}
                  onChange={(e) => setScaleRatio(parseFloat(e.target.value))}
                  className="px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <option value={1.067}>1.067 - Minor Second</option>
                  <option value={1.125}>1.125 - Major Second</option>
                  <option value={1.200}>1.200 - Minor Third</option>
                  <option value={1.250}>1.250 - Major Third (Classic)</option>
                  <option value={1.333}>1.333 - Perfect Fourth</option>
                  <option value={1.618}>1.618 - Golden Ratio</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCopyScaleCss}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 self-start md:self-auto"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'CSS Variables Copied!' : 'Copy CSS Variables'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6">
            {typeSteps.map((step) => (
              <div
                key={step.label}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 gap-2"
              >
                <div className="sm:w-56 shrink-0">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                    {step.label}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {step.px}px · {step.rem}rem
                  </span>
                </div>

                <div
                  style={{ fontSize: `${step.px}px`, lineHeight: 1.25 }}
                  className="font-bold text-zinc-900 dark:text-zinc-100 truncate"
                >
                  Typography is thinking made visual.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTool === 'shortcuts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LAPTOP_SHORTCUTS.map((section) => (
            <div
              key={section.software}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4"
            >
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                {section.software}
              </h3>

              <div className="space-y-2.5">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                    <span className="text-zinc-600 dark:text-zinc-300">{item.action}</span>
                    <kbd className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200 shrink-0">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
