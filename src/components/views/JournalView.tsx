import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Star,
  Laptop,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { DesignCategory } from '../../types';

interface JournalViewProps {
  onOpenLogModal: () => void;
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

export const JournalView: React.FC<JournalViewProps> = ({ onOpenLogModal }) => {
  const { state, deleteSession } = useDesign();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalHours = state.sessions.reduce((acc, s) => acc + s.durationHours, 0);
  const avgSession = state.sessions.length > 0 ? (totalHours / state.sessions.length).toFixed(1) : '0';

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.sessions.forEach((s) => {
      s.toolsUsed.forEach((tool) => {
        counts[tool] = (counts[tool] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [state.sessions]);

  const filteredSessions = useMemo(() => {
    return state.sessions.filter((s) => {
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTopic = s.topic.toLowerCase().includes(q);
        const matchTakeaway = s.takeaway.toLowerCase().includes(q);
        const matchTools = s.toolsUsed.some((t) => t.toLowerCase().includes(q));
        if (!matchTopic && !matchTakeaway && !matchTools) return false;
      }
      return true;
    });
  }, [state.sessions, categoryFilter, searchQuery]);

  const handleDelete = (id: string, topic: string) => {
    if (window.confirm(`Delete practice session "${topic}"?`)) {
      deleteSession(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Studio Journal & Practice History
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Your real-time record of design sessions, software mastery, and academic reflections.
          </p>
        </div>

        <button
          onClick={onOpenLogModal}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 shadow-xs self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record New Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Practice Logged</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalHours.toFixed(1)} hrs</span>
            <span className="text-xs text-zinc-500">({state.sessions.length} sessions)</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Saved offline in browser</p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Average Session</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{avgSession} hrs</span>
            <span className="text-xs text-zinc-500">per studio block</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Optimal focus duration</p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Top Software Mastered</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {toolCounts.slice(0, 4).map(([tool, count]) => (
              <span key={tool} className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
                {tool} ({count})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search takeaways, tools, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-medium text-zinc-500">Filter:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            <option value="all">All Disciplines ({state.sessions.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No journal logs match your query.
            </p>
            <button
              onClick={onOpenLogModal}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Log your current design practice session
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    {session.topic}
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {session.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {session.date}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {session.durationHours}h
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= session.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-200 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(session.id, session.topic)}
                    className="p-1 text-zinc-400 hover:text-rose-500 transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                  "{session.takeaway}"
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
                <Laptop className="w-3.5 h-3.5 text-zinc-400" />
                <span>Tools Used:</span>
                <div className="flex flex-wrap gap-1">
                  {session.toolsUsed.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
