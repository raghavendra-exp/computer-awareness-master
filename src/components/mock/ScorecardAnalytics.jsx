import React, { useState } from 'react';
import { Trophy, CheckCircle, XCircle, Clock, AlertTriangle, HelpCircle, Filter, Bookmark, ArrowLeft } from 'lucide-react';
import { recordMistake } from '../../utils/dataManager';

export default function ScorecardAnalytics({ result, onRetake }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'incorrect' | 'unattempted'

  if (!result) return null;

  const {
    presetTitle,
    total,
    correctCount,
    wrongCount,
    unattemptedCount,
    marks,
    totalPossibleMarks,
    accuracy,
    timeTakenSeconds,
    mockQuestions,
    answers
  } = result;

  const formatSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const avgSecPerQ = Math.round(timeTakenSeconds / total);

  // Filter questions for review
  const filteredQuestions = mockQuestions.filter(q => {
    const userAns = answers[q.id];
    if (filterMode === 'incorrect') {
      return userAns !== undefined && userAns !== q.correctOption;
    }
    if (filterMode === 'unattempted') {
      return userAns === undefined;
    }
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Mock Examination Report
          </span>
          <h2 className="text-xl font-black text-white">{presetTitle}</h2>
        </div>

        <button
          onClick={onRetake}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mock Selector
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-mono">
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">TOTAL SCORE</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            {marks} <span className="text-xs text-slate-500 font-normal">/ {totalPossibleMarks}</span>
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {marks >= 17.5 ? 'Ranker Bracket (99%ile)' : marks >= 14 ? 'Safe Selection' : 'Needs Polish'}
          </span>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">ACCURACY</span>
          <span className="text-2xl font-black text-cyan-400 mt-1 block">{accuracy}%</span>
          <span className="text-[10px] text-slate-400 mt-1 block">Target: 85%+</span>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">ATTEMPT RATIO</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            {correctCount + wrongCount} <span className="text-xs text-slate-500 font-normal">/ {total}</span>
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {correctCount} Correct • {wrongCount} Wrong
          </span>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">SPEED / EFFICIENCY</span>
          <span className="text-2xl font-black text-purple-400 mt-1 block">{avgSecPerQ}s / Q</span>
          <span className="text-[10px] text-slate-400 mt-1 block">Total: {formatSec(timeTakenSeconds)}</span>
        </div>
      </div>

      {/* Review Section Header & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-cyan-400" />
          Question-by-Question Solution Review
        </h3>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg transition ${filterMode === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            All ({total})
          </button>
          <button
            onClick={() => setFilterMode('incorrect')}
            className={`px-3 py-1 rounded-lg transition ${filterMode === 'incorrect' ? 'bg-red-500 text-white font-bold' : 'text-slate-400'}`}
          >
            Incorrect ({wrongCount})
          </button>
          <button
            onClick={() => setFilterMode('unattempted')}
            className={`px-3 py-1 rounded-lg transition ${filterMode === 'unattempted' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            Unattempted ({unattemptedCount})
          </button>
        </div>
      </div>

      {/* Questions Solution List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userAns = answers[q.id];
          const isCorrect = userAns === q.correctOption;
          const isUnattempted = userAns === undefined;

          return (
            <div
              key={q.id}
              className={`p-5 bg-slate-950 rounded-2xl border transition ${
                isCorrect
                  ? 'border-emerald-500/30'
                  : isUnattempted
                  ? 'border-slate-800'
                  : 'border-red-500/30'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs mb-3 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Q.{idx + 1}</span>
                  <span className="text-slate-400">({q.module})</span>
                </div>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : isUnattempted ? (
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                      Unattempted
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm font-semibold text-white mb-2 leading-relaxed">
                {q.question}
              </p>
              {q.questionHindi && (
                <p className="text-xs text-slate-400 mb-4">{q.questionHindi}</p>
              )}

              {/* Options Breakdown */}
              <div className="space-y-1.5 text-xs mb-4">
                {q.options.map((opt, oIdx) => {
                  const isRight = oIdx === q.correctOption;
                  const isUserPick = userAns === oIdx;

                  let rowStyle = 'bg-slate-900/60 border-slate-800 text-slate-400';
                  if (isRight) {
                    rowStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 font-bold';
                  } else if (isUserPick) {
                    rowStyle = 'bg-red-500/10 border-red-500/40 text-red-200';
                  }

                  return (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${rowStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold w-5">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                      {isRight && <span className="text-[10px] text-emerald-400 font-bold font-mono">CORRECT ANSWER</span>}
                      {isUserPick && !isRight && <span className="text-[10px] text-red-400 font-mono">YOUR ANSWER</span>}
                    </div>
                  );
                })}
              </div>

              {/* Detailed Explanation */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 mb-3">
                <span className="font-bold text-cyan-400 block mb-1">Explanation:</span>
                <p className="mb-1">{q.solution}</p>
                {q.solutionHindi && <p className="text-slate-400">{q.solutionHindi}</p>}
              </div>

              {/* Add to Mistakes Notebook CTA */}
              {!isCorrect && (
                <button
                  onClick={() => recordMistake(q, userAns)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save / Update in Mistakes Notebook
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
