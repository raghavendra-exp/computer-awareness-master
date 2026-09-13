import React from 'react';
import { Cpu, Zap, Flame, Trophy, Layers, BookOpen, AlertTriangle, ArrowRight, ShieldCheck, Play, Table, Binary, Network, ShieldAlert, Sparkles } from 'lucide-react';

export default function Dashboard({ readinessData, onNavigate, onLaunchMock }) {
  const {
    score = 50,
    grade = 'Intermediate',
    color = 'text-cyan-400',
    badgeText = 'Score 15-17.5/20 Potential',
    breakdown = { mockAccuracy: 25, syllabusBreadth: 20, speedEfficiency: 15, retentionStreak: 10 },
    metrics = { avgAccuracy: 75, avgSecondsPerQuestion: 25, totalMocksCompleted: 0, activeStreak: 1, unresolvedMistakesCount: 0 }
  } = readinessData || {};

  const modulesList = [
    { id: 'basics', name: 'Fundamentals', icon: Cpu, color: 'text-cyan-400', questionsCount: 45 },
    { id: 'hardware', name: 'Hardware & Architecture', icon: Cpu, color: 'text-blue-400', questionsCount: 45 },
    { id: 'memory', name: 'Memory & Number Systems', icon: Binary, color: 'text-emerald-400', questionsCount: 45 },
    { id: 'os', name: 'Operating Systems', icon: Layers, color: 'text-purple-400', questionsCount: 45 },
    { id: 'office', name: 'MS Office & Shortcuts', icon: Table, color: 'text-amber-400', questionsCount: 65 },
    { id: 'networking', name: 'Networking & OSI', icon: Network, color: 'text-indigo-400', questionsCount: 50 },
    { id: 'security', name: 'Cybersecurity & IT Act', icon: ShieldAlert, color: 'text-red-400', questionsCount: 50 },
    { id: 'banking', name: 'Digital Banking & Fintech', icon: Trophy, color: 'text-teal-400', questionsCount: 45 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXAM TARGET: SBI CLERK • IBPS CLERK/CSA • RRB OFFICE ASSISTANT 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Computer Awareness <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Master</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Go from <strong>Zero ➔ Concept Clear ➔ Simulators ➔ PYQ ➔ 18+/20 Exam Ranker</strong>. Complete with 10 interactive visual labs, 508 bilingual exam MCQs, and full RRB Mains timed simulator.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onLaunchMock('rrb-full-mains-1')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition duration-200"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Start Full RRB Mains Mock (40 Qs)
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-700 transition"
            >
              <BookOpen className="w-4 h-4" />
              Bilingual Practice Arena
            </button>
          </div>
        </div>
      </div>

      {/* Readiness Score & KPI Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Computer Readiness Score Meter (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase font-bold text-slate-400">
                Exam Readiness Meter
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-400 font-bold">
                {badgeText}
              </span>
            </div>

            <div className="flex items-center gap-6 my-4">
              {/* Score Gauge Circle */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * score) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white font-mono">{score}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">/ 100</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Estimated Potential:</span>
                <div className={`text-lg font-black ${color}`}>{grade}</div>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Based on mock accuracy, syllabus breadth, speed benchmark, and retention streak.
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Breakdown */}
          <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs font-mono">
            <div className="flex justify-between items-center text-slate-400">
              <span>Mock Accuracy (35%)</span>
              <strong className="text-white">{breakdown.mockAccuracy} / 35</strong>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Syllabus Breadth (30%)</span>
              <strong className="text-white">{breakdown.syllabusBreadth} / 30</strong>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Speed Target &lt;25s (20%)</span>
              <strong className="text-white">{breakdown.speedEfficiency} / 20</strong>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Retention & Streak (15%)</span>
              <strong className="text-white">{breakdown.retentionStreak} / 15</strong>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat KPIs (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Active Streak</span>
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-mono">{metrics.activeStreak} Days</div>
              <p className="text-xs text-slate-400 mt-1">Consistent daily bank exam revision</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Speed Benchmark</span>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-mono">{metrics.avgSecondsPerQuestion}s</div>
              <p className="text-xs text-slate-400 mt-1">Avg time / question (Target: &lt;25s)</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Full Mocks Taken</span>
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-mono">{metrics.totalMocksCompleted}</div>
              <p className="text-xs text-slate-400 mt-1">Avg Accuracy: {metrics.avgAccuracy}%</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-red-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Mistakes Log</span>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-mono">{metrics.unresolvedMistakesCount}</div>
              <button
                onClick={() => onNavigate('mistakes')}
                className="text-xs text-red-400 hover:text-red-300 font-semibold mt-1 flex items-center gap-1"
              >
                Resolve in Notebook →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Interactive Simulators Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-cyan-400 tracking-wider">
              Experimental Hands-On Labs
            </span>
            <h2 className="text-xl font-bold text-white">10 Interactive Visual Simulators</h2>
          </div>
          <span className="text-xs text-slate-400">Click any lab to launch instant interactive model</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 'cpu-sim', name: 'CPU Pipeline', icon: Cpu, color: 'text-cyan-400', desc: 'Fetch-Decode-Execute' },
            { id: 'pc-builder', name: 'Build A PC', icon: Layers, color: 'text-blue-400', desc: 'Hardware & Watts' },
            { id: 'binary-sim', name: 'Number Base', icon: Binary, color: 'text-emerald-400', desc: 'Decimal ➔ Binary' },
            { id: 'shortcut-lab', name: 'Shortcut Lab', icon: Zap, color: 'text-amber-400', desc: '104-Key Virtual' },
            { id: 'excel-sim', name: 'Mini Excel', icon: Table, color: 'text-teal-400', desc: 'Live Formula Grid' },
            { id: 'web-flow', name: 'URL Journey', icon: BookOpen, color: 'text-purple-400', desc: 'DNS ➔ TCP ➔ TLS' },
            { id: 'topology-sim', name: 'Topologies', icon: Network, color: 'text-indigo-400', desc: 'Star, Mesh, Bus' },
            { id: 'osi-sim', name: '7-Layer OSI', icon: Layers, color: 'text-pink-400', desc: 'Deep Layer PDU' },
            { id: 'phishing-sim', name: 'Cyber Fraud', icon: ShieldAlert, color: 'text-red-400', desc: 'Phishing Detector' },
            { id: 'ds-sim', name: 'Stack & Queue', icon: Layers, color: 'text-orange-400', desc: 'LIFO vs FIFO' }
          ].map(sim => {
            const Icon = sim.icon;
            return (
              <button
                key={sim.id}
                onClick={() => onNavigate(sim.id)}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 rounded-2xl text-left transition duration-200 group flex flex-col justify-between"
              >
                <div>
                  <Icon className={`w-5 h-5 ${sim.color} mb-2 group-hover:scale-110 transition`} />
                  <div className="font-bold text-white text-xs mb-0.5 group-hover:text-cyan-300 transition">
                    {sim.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{sim.desc}</div>
                </div>
                <div className="mt-3 text-[10px] text-cyan-400 font-mono font-bold flex items-center gap-1">
                  Launch <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Syllabus Modules Quick Jump */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4">Complete Banking Syllabus Modules</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {modulesList.map(mod => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition"
              >
                <Icon className={`w-5 h-5 ${mod.color} mb-2`} />
                <div className="font-bold text-white text-xs">{mod.name}</div>
                <span className="text-[10px] text-slate-500 font-mono">{mod.questionsCount}+ Questions</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
