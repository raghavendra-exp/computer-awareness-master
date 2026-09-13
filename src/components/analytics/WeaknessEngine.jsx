import React from 'react';
import { AlertTriangle, Zap, CheckCircle2, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { getMistakes } from '../../utils/dataManager';

export default function WeaknessEngine({ readinessData, onLaunchWeaknessDrill }) {
  const mistakes = getMistakes();

  const weaknesses = readinessData?.topWeaknesses || [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Diagnostic Weakness Analysis Engine</h2>
            <p className="text-xs text-slate-400">
              Automated Error Auditing • Sub-Topic Gap Identification & Personalized Remedial Drills
            </p>
          </div>
        </div>

        {weaknesses.length > 0 && (
          <button
            onClick={() => onLaunchWeaknessDrill(weaknesses[0]?.module)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs hover:from-amber-400 hover:to-yellow-400 transition"
          >
            <Zap className="w-4 h-4" />
            Launch Targeted 10-Question Drill
          </button>
        )}
      </div>

      {/* Weakness Modules Breakdown */}
      {weaknesses.length > 0 ? (
        <div className="space-y-4 mb-6">
          {weaknesses.map((w, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    #{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">{w.module}</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Total Recorded Mistakes: <strong className="text-red-400 font-mono">{w.errorCount}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLaunchWeaknessDrill(w.module)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  Targeted Drill ({w.module})
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 mb-6">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Critical Weaknesses Detected!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your accuracy across modules is high. Practice full-length Mains mocks or rapid speed drills to maintain 18+/20 marks mastery.
          </p>
        </div>
      )}

      {/* 3 Step Prescription */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-cyan-400 font-bold block mb-1">1. ISOLATE</span>
          <span className="text-slate-300">Identify the specific concept where the trap was triggered.</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-amber-400 font-bold block mb-1">2. TARGET DRILL</span>
          <span className="text-slate-300">Solve 10 questions strictly focusing on the weak module.</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-emerald-400 font-bold block mb-1">3. RETEST</span>
          <span className="text-slate-300">Verify error resolution in Mistakes Notebook.</span>
        </div>
      </div>
    </div>
  );
}
