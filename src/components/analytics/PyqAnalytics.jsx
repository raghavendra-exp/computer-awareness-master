import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, HelpCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PyqAnalytics({ pyqData }) {
  const [selectedYear, setSelectedYear] = useState('2024-2025');

  if (!pyqData) return null;

  const currentTrend = pyqData.yearlyTrends.find(y => y.year === selectedYear) || pyqData.yearlyTrends[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bank Exam PYQ Shift Analytics & Weightage Matrix</h2>
            <p className="text-xs text-slate-400">
              Shift Patterns (2020-2026) for SBI Clerk, IBPS Clerk, and RRB Office Assistant Mains
            </p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {pyqData.yearlyTrends.map(y => (
            <button
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              className={`px-3 py-1 rounded-lg transition ${
                selectedYear === y.year ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Pattern Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {pyqData.examPatterns.map((pat, idx) => (
          <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block mb-1">Target Exam</span>
              <h3 className="text-sm font-bold text-white mb-2">{pat.exam}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {pat.role || pat.trend}
              </p>
            </div>
            {pat.totalQuestions && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{pat.totalQuestions} Qs ({pat.totalMarks} Marks)</span>
                <span className="text-emerald-400 font-bold">{pat.scoringPotential}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Year Topic Weightage Breakdown */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              {selectedYear} Shift Weightage & Question Distribution
            </h3>
            <span className="text-xs text-slate-400 mt-0.5 block">{currentTrend.shiftInsights}</span>
          </div>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 rounded-full">
            Difficulty: {currentTrend.difficulty}
          </span>
        </div>

        {/* Visual Progress Bars */}
        <div className="space-y-4 text-xs font-mono">
          {currentTrend.topicDistribution.map((t, idx) => {
            const pct = parseInt(t.weightage, 10);
            return (
              <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-white">{t.topic}</span>
                  <span className="text-cyan-400 font-bold">{t.questionCount} Questions ({t.weightage})</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct * 3.5}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Frequency Exam Trap Matrix */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          High-Frequency Exam Trap Matrix (Must-Know Nuances)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pyqData.trapCategories.map((tr, idx) => (
            <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white text-sm">{tr.trap}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono">
                  Frequency: {tr.frequency}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{tr.trapDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
