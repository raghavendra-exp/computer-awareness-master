import React, { useState, useMemo } from 'react';
import { Bookmark, Trash2, HelpCircle, CheckCircle } from 'lucide-react';
import { getBookmarks, toggleBookmark } from '../../utils/dataManager';

export default function BookmarksManager({ allQuestions = [] }) {
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  const bookmarkedQuestions = useMemo(() => {
    return allQuestions.filter(q => bookmarks.includes(q.id));
  }, [allQuestions, bookmarks]);

  const handleRemove = (qId) => {
    toggleBookmark(qId);
    setBookmarks(getBookmarks());
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Bookmark className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bookmarked Questions Manager</h2>
            <p className="text-xs text-slate-400">
              Personalized Collection of High-Yield & Tricky Revision Items
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-slate-400">
          Saved Questions: <strong className="text-amber-400">{bookmarkedQuestions.length}</strong>
        </span>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any question in the Practice Arena to save it here for targeted revision.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{q.id}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {q.module}
                  </span>
                  <span className="text-slate-500 font-normal">({q.source})</span>
                </div>

                <button
                  onClick={() => handleRemove(q.id)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-white mb-2 leading-relaxed">
                {q.question}
              </p>
              {q.questionHindi && (
                <p className="text-xs text-slate-400 mb-4">{q.questionHindi}</p>
              )}

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1">
                  Correct Answer: {String.fromCharCode(65 + q.correctOption)}. {q.options[q.correctOption]}
                </span>
                <p>{q.solution}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
