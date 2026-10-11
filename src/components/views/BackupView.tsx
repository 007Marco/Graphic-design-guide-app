import React, { useState } from 'react';
import {
  Download,
  Upload,
  FileText,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export const BackupView: React.FC = () => {
  const {
    state,
    exportBackupFile,
    getBackupJSONString,
    importBackupJSON,
    exportMarkdownReport,
    resetAllData,
  } = useDesign();

  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const dataSizeKb = (new Blob([JSON.stringify(state)]).size / 1024).toFixed(2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(getBackupJSONString());
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importBackupJSON(content);
        if (res.success) {
          setImportStatus({ type: 'success', message: res.message });
          setJsonInput('');
        } else {
          setImportStatus({ type: 'error', message: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!jsonInput.trim()) return;
    const res = importBackupJSON(jsonInput);
    if (res.success) {
      setImportStatus({ type: 'success', message: res.message });
      setJsonInput('');
    } else {
      setImportStatus({ type: 'error', message: res.message });
    }
  };

  const handleReset = () => {
    if (window.confirm('Restore initial university curriculum defaults? Custom subtopics and logs will be reset.')) {
      resetAllData();
      setImportStatus({ type: 'success', message: 'Successfully reset to fresh curriculum defaults.' });
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Data Backup, Export & Offline Synchronization
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Everything you do in Atelier is stored 100% locally on your laptop. Export anytime to back up or move to another device.
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Offline Mode Active & Verified
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Real-Time
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Browser Local Storage: ~{dataSizeKb} KB utilized · Zero network latency · No account required
            </p>
          </div>
        </div>

        <div className="text-xs text-zinc-500">
          Last backup: <strong className="text-zinc-800 dark:text-zinc-200">{state.lastBackupDate ? state.lastBackupDate.split('T')[0] : 'Not downloaded yet'}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Export Column */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Export Your Data
            </h3>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Download your full design database or generate a formatted Markdown summary to keep in Obsidian, Notion, or your design portfolio.
          </p>

          <div className="space-y-2.5 pt-1">
            <button
              onClick={exportBackupFile}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup File (.json)</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedJson ? 'JSON Copied to Clipboard!' : 'Copy Raw JSON to Clipboard'}</span>
            </button>

            <button
              onClick={exportMarkdownReport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <FileText className="w-4 h-4 text-purple-500" />
              <span>Export Academic Studio Dossier (.md)</span>
            </button>
          </div>
        </div>

        {/* Restore Column */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Restore / Sync From Backup
            </h3>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Upload a previously exported backup file or paste JSON code from another browser or laptop.
          </p>

          {importStatus && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                importStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200'
              }`}
            >
              {importStatus.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{importStatus.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Upload .json file:
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full text-xs text-zinc-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-800 dark:file:text-zinc-200 hover:file:bg-zinc-200 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Or paste backup JSON text:
            </label>
            <textarea
              rows={3}
              placeholder="Paste JSON text here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {jsonInput.trim() && (
              <button
                onClick={handleManualImport}
                className="mt-2 px-3 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Restore from Pasted JSON
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Danger Zone */}
      <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-950/50 bg-rose-50/20 dark:bg-rose-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
            Reset Curriculum & Sample Data
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Reset all milestones, briefs, and practice logs back to fresh initial state.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Curriculum Defaults</span>
        </button>
      </div>

    </div>
  );
};
