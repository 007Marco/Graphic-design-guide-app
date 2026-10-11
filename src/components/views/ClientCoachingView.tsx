import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CLIENT_COACHING_MODULES } from '../../data/curriculumData';
import { ClientCoachModule } from '../../types';

export const ClientCoachingView: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>(CLIENT_COACHING_MODULES[0].id);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // Interactive Client Intake Questionnaire Generator
  const [clientName, setClientName] = useState('Acme Organics');
  const [projectType, setProjectType] = useState('Brand Identity & Packaging');
  const [primaryGoal, setPrimaryGoal] = useState('Attract high-income eco-conscious retail buyers');
  const [copiedIntake, setCopiedIntake] = useState(false);

  // Red Flag Checklist
  const [redFlags, setRedFlags] = useState<{ id: string; text: string; checked: boolean }[]>([
    { id: 'rf-1', text: 'Client asks for "spec work" (free mockups before signing a contract)', checked: false },
    { id: 'rf-2', text: 'Client demands "unlimited revisions" without defined milestones', checked: false },
    { id: 'rf-3', text: 'Refuses to pay a 50% upfront deposit before work begins', checked: false },
    { id: 'rf-4', text: 'Says "This is super easy, it should only take you 30 minutes on your laptop"', checked: false },
    { id: 'rf-5', text: 'Promises "Huge exposure and lots of work later" in exchange for low fees', checked: false },
  ]);

  const activeModule = CLIENT_COACHING_MODULES.find((m) => m.id === activeModuleId) || CLIENT_COACHING_MODULES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const generatedIntakeQuestions = `CONFIDENTIAL CLIENT DISCOVERY QUESTIONNAIRE
Project: ${projectType} for ${clientName}

1. CORE BUSINESS OBJECTIVE:
- What specific business outcome should this design work achieve? (${primaryGoal})
- How will you objectively measure the return on this investment 6 months post-launch?

2. TARGET AUDIENCE & PSYCHOLOGY:
- Who is your ideal customer profile, and what single emotional perception must this design evoke?
- What current friction or skepticism prevents them from choosing your product over alternatives?

3. SCOPE, DECISION AUTHORITY & TIMELINE:
- Who within your executive team has the ultimate sign-off authority on visual direction?
- Are there non-negotiable launch dates tied to marketing events, investor milestones, or PR?
- What existing brand assets, guidelines, and vector files will be provided at kickoff?

4. BUDGET & ENGAGEMENT PARAMETERS:
- Has a specific budget bracket been approved for this initiative?
- All projects operate on a 50% kickoff deposit and 2 consolidated rounds of feedback.`;

  const handleCopyIntake = () => {
    navigator.clipboard.writeText(generatedIntakeQuestions);
    setCopiedIntake(true);
    setTimeout(() => setCopiedIntake(false), 2000);
  };

  const toggleRedFlag = (id: string) => {
    setRedFlags((prev) =>
      prev.map((rf) => (rf.id === id ? { ...rf, checked: !rf.checked } : rf))
    );
  };

  const checkedRedFlagCount = redFlags.filter((rf) => rf.checked).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Professional Practice Research & Studio Guidance</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Client-to-Service Provider Relations & Freelance Coaching Guide
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          How a university-trained designer transitions from a software operator into a high-value strategic partner. Master client discovery, psychological framing, boundary defense, constructive disagreement, and repeat retainers.
        </p>
      </div>

      {/* 5-Phase Tabs Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {CLIENT_COACHING_MODULES.map((mod, idx) => {
          const isActive = mod.id === activeModuleId;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
              }`}
            >
              <span className="block text-[10px] font-mono opacity-70">
                Phase 0{idx + 1}
              </span>
              <span className="block text-xs font-bold mt-0.5 truncate">
                {mod.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Module In-Depth Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Questions, Focus & Red Flags */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase">
                {activeModule.phase}
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {activeModule.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                {activeModule.summary}
              </p>
            </div>

            {/* Psychological Insight Box */}
            <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/50">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
                  Client Behavioral Psychology Insight
                </span>
              </div>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
                "{activeModule.psychologicalInsight}"
              </p>
            </div>

            {/* Key Questions to Ask */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Essential Questions to Ask Your Client:
                </span>
              </div>
              <div className="space-y-2">
                {activeModule.keyQuestionsToAsk.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-xs text-zinc-800 dark:text-zinc-200 flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to Focus on & What to Avoid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Key Things to Focus On:
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pl-3 list-disc">
                  {activeModule.thingsToFocusOn.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Critical Mistakes to Avoid:
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pl-3 list-disc">
                  {activeModule.whatToAvoid.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Copyable Script Templates & Generator */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Ready-to-Send Script Template */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Ready-to-Send Client Script / Email Template
                </h4>
              </div>
              <button
                onClick={() => handleCopy(activeModule.scriptTemplate, activeModule.id)}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedScriptId === activeModule.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScriptId === activeModule.id ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {activeModule.scriptTemplate}
            </pre>
          </div>

          {/* Client Red Flag Detector Interactive Test */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Client Red Flag Diagnostic
                </h4>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                checkedRedFlagCount >= 2 ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
              }`}>
                {checkedRedFlagCount} Warning{checkedRedFlagCount === 1 ? '' : 's'}
              </span>
            </div>

            <div className="space-y-2">
              {redFlags.map((rf) => (
                <div
                  key={rf.id}
                  onClick={() => toggleRedFlag(rf.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                    rf.checked
                      ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 font-medium'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={rf.checked}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-rose-600 focus:ring-0"
                  />
                  <span>{rf.text}</span>
                </div>
              ))}
            </div>

            {checkedRedFlagCount >= 2 && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                ⚠️ Danger: This client exhibits classic warning signs of scope creep and payment friction. Require 100% upfront payment or decline politely.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Interactive Questionnaire Generator */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Interactive Client Discovery Questionnaire Generator
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Customize client parameters to generate an instant strategic intake document you can copy and send.
            </p>
          </div>

          <button
            onClick={handleCopyIntake}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 self-start sm:self-auto"
          >
            {copiedIntake ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIntake ? 'Questionnaire Copied!' : 'Copy Questionnaire'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Client / Company Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Project Discipline</label>
            <input
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Core Business Goal</label>
            <input
              type="text"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
          {generatedIntakeQuestions}
        </pre>
      </div>

    </div>
  );
};
