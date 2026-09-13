import React, { useState } from 'react';
import { BookOpen, Cpu, HardDrive, Layers, Globe, Shield, Database, Code, CreditCard, Sparkles, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

export default function ConceptModuleViewer({ moduleData, onLaunchSimulator }) {
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  if (!moduleData) {
    return (
      <div className="p-8 text-center text-slate-500">
        Select a conceptual module from the sidebar or curriculum tab to start reading.
      </div>
    );
  }

  const sections = moduleData.sections || (moduleData.apps ? moduleData.apps.map(a => ({
    id: a.id,
    title: a.name,
    hindiTitle: a.hindiName,
    overview: a.role,
    examTips: a.examTips,
    details: a
  })) : []);

  const activeSection = sections.find(s => s.id === selectedSectionId) || sections[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      {/* Module Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
            Syllabus Module • Version {moduleData.version || '2026.1'}
          </span>
          <h2 className="text-xl font-bold text-white">{moduleData.module}</h2>
        </div>

        {/* Section Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSectionId(s.id)}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                (activeSection?.id === s.id)
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {activeSection && (
        <div className="space-y-6">
          {/* Section Heading & Bilingual Intro */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">{activeSection.title}</h3>
            {activeSection.hindiTitle && (
              <span className="text-xs text-cyan-400 font-normal block mb-3">
                {activeSection.hindiTitle}
              </span>
            )}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
              {activeSection.overview || activeSection.desc}
            </p>
            {activeSection.hindiOverview && (
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeSection.hindiOverview}
              </p>
            )}
          </div>

          {/* Key Functions / Features / Properties Grid */}
          {activeSection.keyFunctions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSection.keyFunctions.map((fn, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <strong className="text-white font-bold block mb-1">{fn.name}</strong>
                  <span className="text-slate-400">{fn.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* OS Types */}
          {activeSection.types && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSection.types.map((tp, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-cyan-300 font-bold text-sm">{tp.type || tp.name}</strong>
                    {tp.example && (
                      <span className="text-[10px] text-slate-500 font-mono">e.g. {tp.example}</span>
                    )}
                  </div>
                  <p className="text-slate-300 mb-2">{tp.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comparison Tables (e.g. FAT32 vs NTFS) */}
          {activeSection.comparison && (
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="p-3">File System</th>
                    <th className="p-3">Max File Size</th>
                    <th className="p-3">Max Volume Size</th>
                    <th className="p-3">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSection.comparison.map((c, i) => (
                    <tr key={i} className="border-b border-slate-800/60 hover:bg-slate-900/30">
                      <td className="p-3 font-bold text-cyan-300">{c.name}</td>
                      <td className="p-3 text-emerald-400 font-bold">{c.maxFileSize}</td>
                      <td className="p-3 text-slate-300">{c.maxVolSize}</td>
                      <td className="p-3 text-slate-400 font-sans">{c.features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Booting Steps */}
          {activeSection.steps && (
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">Boot Sequence Steps:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
                {activeSection.steps.map(st => (
                  <div key={st.step} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[10px] mb-2">
                      {st.step}
                    </span>
                    <strong className="text-white block mb-1">{st.name}</strong>
                    <span className="text-[11px] text-slate-400 font-sans">{st.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linux Commands List */}
          {activeSection.topCommands && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {activeSection.topCommands.map((cmd, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold block w-fit mb-1">
                    $ {cmd.command}
                  </span>
                  <span className="text-slate-300 font-sans">{cmd.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* Exam Tips & Traps Box */}
          {(activeSection.examTips || activeSection.examTraps) && (
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>High-Frequency Bank Exam Points & Tips:</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside">
                {(activeSection.examTips || activeSection.examTraps).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
