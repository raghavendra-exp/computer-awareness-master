import React, { useState } from 'react';
import { Bookmark, CheckCircle2, Trash2, HelpCircle, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { getMistakes, removeMistake } from '../../utils/dataManager';

export default function MistakesNotebook() {
  const [mistakes, setMistakes] = useState(getMistakes());

  const handleResolve = (qId) => {
    const updated = removeMistake(qId);
    setMistakes(updated);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Personal Mistakes Notebook</h2>
            <p className="text-xs text-slate-400">
              Your Personal High-Yield Error Log • Analyze Misconceptions & Clear Traps
            </p>
          </div>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400">
          Unresolved Mistakes: <strong className="text-red-400">{mistakes.length}</strong>
        </div>
      </div>

      {mistakes.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Mistakes Notebook is Clean!</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Whenever you commit an error during practice or mock tests, it automatically gets filed here for systematic revision.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakes.map((m, idx) => (
            <div
              key={m.questionId || idx}
              className="p-5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">#{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {m.module}
                  </span>
                  <span className="text-slate-500">Failed: {m.mistakeCount}x</span>
                </div>

                <button
                  onClick={() => handleResolve(m.questionId)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 text-xs font-semibold transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mark as Mastered
                </button>
              </div>

              <p className="text-sm font-semibold text-white mb-2 leading-relaxed">
                {m.questionText}
              </p>
              {m.questionHindi && (
                <p className="text-xs text-slate-400 mb-4">{m.questionHindi}</p>
              )}

              {/* Options breakdown */}
              {m.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 font-mono">
                    <span className="text-[10px] uppercase font-bold block text-red-400">Your Wrong Choice:</span>
                    <span>
                      {m.userSelectedOption !== undefined && m.options[m.userSelectedOption]
                        ? `${String.fromCharCode(65 + m.userSelectedOption)}. ${m.options[m.userSelectedOption]}`
                        : 'Timed Out / Skipped'}
                    </span>
                  </div>

                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono">
                    <span className="text-[10px] uppercase font-bold block text-emerald-400">Correct Answer:</span>
                    <span>
                      {String.fromCharCode(65 + m.correctOption)}. {m.options[m.correctOption]}
                    </span>
                  </div>
                </div>
              )}

              {/* Solution & Trap */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div>
                  <strong className="text-cyan-400">Explanation: </strong>
                  <span>{m.solution}</span>
                </div>
                {m.trapAlert && (
                  <div className="text-amber-300 pt-1 border-t border-slate-800/60 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span><strong>Trap Alert:</strong> {m.trapAlert}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
