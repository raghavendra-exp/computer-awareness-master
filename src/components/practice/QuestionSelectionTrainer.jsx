import React, { useState } from 'react';
import { Target, CheckCircle, AlertTriangle, ArrowRight, HelpCircle, RotateCcw } from 'lucide-react';

const DRILL_QUESTIONS = [
  {
    id: 1,
    text: 'What is the default port number assigned to HTTP traffic?',
    idealCategory: 'do-first',
    rationale: 'Direct factual recall (<5 seconds). Immediate free mark with zero risk of calculation error.'
  },
  {
    id: 2,
    text: 'Calculate the total number of duplex links required in a fully connected mesh network of 9 nodes.',
    idealCategory: 'review-later',
    rationale: 'Requires formula calculation 9*(9-1)/2 = 36. Easy mark, but takes 15-20 seconds. Do in second pass.'
  },
  {
    id: 3,
    text: 'What is the evaluated output of =IF(AND(COUNT(A1:A5)>2, SUM(B1:B5)<100), MAX(C1:C5), MIN(D1:D5))?',
    idealCategory: 'review-later',
    rationale: 'Nested Excel formula. High chance of arithmetic slip under pressure. Solve in Round 2.'
  },
  {
    id: 4,
    text: 'Under Section 66A of IT Act (which was struck down in Shreya Singhal), what was the exact statutory imprisonment?',
    idealCategory: 'skip-trap',
    rationale: 'Trap / Ambiguous legal nuance. High chance of negative marking unless 100% certain. Better to skip.'
  },
  {
    id: 5,
    text: 'What is the keyboard shortcut to insert a new slide in PowerPoint?',
    idealCategory: 'do-first',
    rationale: 'High-frequency direct question. Instant answer: Ctrl + M. (5-second quick score).'
  }
];

export default function QuestionSelectionTrainer() {
  const [decisions, setDecisions] = useState({}); // { 1: 'do-first', 2: 'review-later', ... }
  const [submitted, setSubmitted] = useState(false);

  const handleAssign = (qId, bucket) => {
    if (submitted) return;
    setDecisions(prev => ({ ...prev, [qId]: bucket }));
  };

  const handleReset = () => {
    setDecisions({});
    setSubmitted(false);
  };

  // Calculate strategy score
  let correctDecisions = 0;
  DRILL_QUESTIONS.forEach(q => {
    if (decisions[q.id] === q.idealCategory) correctDecisions++;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Question Selection & Triage Trainer</h2>
            <p className="text-xs text-slate-400">
              Exam Strategy: Categorize questions into 'Do First', 'Review Later', or 'Skip (Trap)'
            </p>
          </div>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Trainer
          </button>
        )}
      </div>

      {/* Strategy Explanation Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-xs font-mono">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300">
          <strong className="block text-white mb-1">1. DO FIRST (Round 1)</strong>
          <span>Direct fact questions (ports, shortcuts, acronyms). Takes 5-10s. Bank early marks.</span>
        </div>
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300">
          <strong className="block text-white mb-1">2. REVIEW LATER (Round 2)</strong>
          <span>Formula math, binary conversions, nested IF formulas. Takes 20-30s.</span>
        </div>
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
          <strong className="block text-white mb-1">3. SKIP / TRAP (Avoid)</strong>
          <span>Ambiguous, confusing multiple negatives, or obscure obscure IT sections. Protect negative marks!</span>
        </div>
      </div>

      {/* Questions Triage List */}
      <div className="space-y-4 mb-6">
        {DRILL_QUESTIONS.map(q => {
          const userBucket = decisions[q.id];
          const isMatched = submitted && userBucket === q.idealCategory;

          return (
            <div
              key={q.id}
              className={`p-4 bg-slate-950 rounded-xl border transition ${
                submitted
                  ? isMatched
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-amber-500/50 bg-amber-500/5'
                  : 'border-slate-800'
              }`}
            >
              <div className="text-xs sm:text-sm font-semibold text-white mb-3 leading-relaxed">
                <span className="text-cyan-400 font-mono mr-2">Q{q.id}.</span>
                {q.text}
              </div>

              {/* Bucket Selection Buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <button
                  onClick={() => handleAssign(q.id, 'do-first')}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    userBucket === 'do-first'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Do First (&lt;10s)
                </button>

                <button
                  onClick={() => handleAssign(q.id, 'review-later')}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    userBucket === 'review-later'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Review Later (Round 2)
                </button>

                <button
                  onClick={() => handleAssign(q.id, 'skip-trap')}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    userBucket === 'skip-trap'
                      ? 'bg-red-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Skip / Trap
                </button>
              </div>

              {/* Forensic Feedback if submitted */}
              {submitted && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs flex items-start gap-2">
                  {isMatched ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-white">Ideal Strategy: </span>
                    <span className="text-cyan-300 font-mono uppercase mr-2">{q.idealCategory}</span>
                    <span className="text-slate-400">{q.rationale}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission CTA */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(decisions).length < DRILL_QUESTIONS.length}
          className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 disabled:opacity-40 transition"
        >
          Evaluate Exam Strategy Decisions
        </button>
      ) : (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
          <span>Strategy Match Score: <strong className="text-emerald-400">{correctDecisions} / {DRILL_QUESTIONS.length} Correct</strong></span>
          <span className="text-slate-400">Target: High-speed Round 1 triage maximizes overall mains marks.</span>
        </div>
      )}
    </div>
  );
}
