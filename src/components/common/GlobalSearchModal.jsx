import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Layers, Keyboard, Table, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate, abbreviations = [], shortcuts = [], questions = [] }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('search-open');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search matches
  const matchedAbbr = abbreviations
    .filter(a => a.term.toLowerCase().includes(trimmed) || a.fullForm.toLowerCase().includes(trimmed))
    .slice(0, 4);

  const matchedShortcuts = shortcuts
    .filter(s => s.keys.toLowerCase().includes(trimmed) || s.action.toLowerCase().includes(trimmed))
    .slice(0, 4);

  const matchedQuestions = questions
    .filter(q => q.question.toLowerCase().includes(trimmed) || (q.questionHindi && q.questionHindi.includes(trimmed)))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-slate-100">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search everything: shortcuts, full forms, OSI layers, RTGS, Excel formulas... (Esc to close)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[420px] overflow-y-auto space-y-4 text-xs">
          {!trimmed ? (
            <div className="text-center py-8 text-slate-500 font-mono">
              Type keywords like <strong className="text-cyan-400">Ctrl+M</strong>, <strong className="text-cyan-400">RTGS</strong>, <strong className="text-cyan-400">Port 80</strong>, or <strong className="text-cyan-400">FAT32</strong>...
            </div>
          ) : (
            <>
              {/* Abbreviations matches */}
              {matchedAbbr.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 mb-2 block">
                    Full Forms & Terms ({matchedAbbr.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedAbbr.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => { onNavigate('dictionary'); onClose(); }}
                        className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer transition"
                      >
                        <div>
                          <strong className="text-cyan-300 font-mono mr-2">{item.term}</strong>
                          <span className="text-white">{item.fullForm}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shortcuts matches */}
              {matchedShortcuts.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400 mb-2 block">
                    Keyboard Shortcuts ({matchedShortcuts.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedShortcuts.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => { onNavigate('shortcut-lab'); onClose(); }}
                        className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer transition"
                      >
                        <div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold mr-2">
                            {s.keys}
                          </span>
                          <span className="text-slate-300">{s.action}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions matches */}
              {matchedQuestions.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-2 block">
                    Practice Questions ({matchedQuestions.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedQuestions.map((q, i) => (
                      <div
                        key={i}
                        onClick={() => { onNavigate('practice'); onClose(); }}
                        className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 cursor-pointer transition"
                      >
                        <div className="font-semibold text-white truncate">{q.question}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {q.id} • {q.module} • {q.badge}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedAbbr.length === 0 && matchedShortcuts.length === 0 && matchedQuestions.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No direct matches found for "{query}". Try a different keyword.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
