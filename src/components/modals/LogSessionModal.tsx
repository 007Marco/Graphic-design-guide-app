import React, { useState } from 'react';
import { X, Clock, Calendar, Star } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { DesignCategory } from '../../types';

interface LogSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionLogged?: () => void;
}

const COMMON_TOOLS = [
  'Figma',
  'Pen Tool',
  'Adobe Illustrator',
  'Photoshop',
  'Photopea',
  'Inkscape',
  'Canva',
  'Pen & Paper',
  'Are.na / Moodboards',
];

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

export const LogSessionModal: React.FC<LogSessionModalProps> = ({ isOpen, onClose, onSessionLogged }) => {
  const { addSession, state } = useDesign();

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [durationHours, setDurationHours] = useState(1.5);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<DesignCategory>('Typography');
  const [selectedTools, setSelectedTools] = useState<string[]>(['Figma']);
  const [takeaway, setTakeaway] = useState('');
  const [rating, setRating] = useState(4);
  const [milestoneId, setMilestoneId] = useState('');

  if (!isOpen) return null;

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addSession({
      date,
      durationHours: Number(durationHours),
      topic: topic.trim(),
      category,
      toolsUsed: selectedTools.length > 0 ? selectedTools : ['Laptop'],
      takeaway: takeaway.trim() || 'Practiced core design fundamentals at home.',
      rating,
      milestoneId: milestoneId || undefined,
    });

    if (onSessionLogged) {
      onSessionLogged();
    }
    onClose();
  };

  const relevantMilestones = state.milestones.filter(
    (m) => m.category === category || m.status === 'in-progress'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Record Studio Practice Session
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Record what you worked on at your laptop today.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Duration (Hours)
              </label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="16"
                value={durationHours}
                onChange={(e) => setDurationHours(parseFloat(e.target.value) || 0.5)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex gap-1 mt-1.5">
                {[0.5, 1.0, 1.5, 2.0, 3.0].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDurationHours(h)}
                    className={`px-2 py-0.5 text-[10px] rounded border ${
                      durationHours === h
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                        : 'text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Topic / Focus Area
            </label>
            <input
              type="text"
              placeholder="e.g. Kerning pair exercises & optical letterform balancing"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Link to Subtopic (Optional)
              </label>
              <select
                value={milestoneId}
                onChange={(e) => setMilestoneId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <option value="">None / General Practice</option>
                {relevantMilestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.status === 'completed' ? '✓ ' : ''}{m.title.slice(0, 36)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Tools Used
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TOOLS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Key Academic Takeaway / Revelation
            </label>
            <textarea
              rows={2}
              placeholder="What clicked today? Any shortcuts, mistakes caught, or design rules realized?"
              value={takeaway}
              onChange={(e) => setTakeaway(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Session Focus & Satisfaction Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-zinc-300 dark:text-zinc-600 hover:text-amber-400 focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : ''
                    }`}
                  />
                </button>
              ))}
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
              Save Studio Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
