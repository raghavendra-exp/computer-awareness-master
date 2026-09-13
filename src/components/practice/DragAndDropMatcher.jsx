import React, { useState } from 'react';
import { Shuffle, CheckCircle, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const MATCH_SETS = [
  {
    id: 'ports',
    title: 'Protocols ➔ Standard Port Numbers',
    pairs: [
      { left: 'HTTP', right: 'Port 80' },
      { left: 'HTTPS', right: 'Port 443' },
      { left: 'SSH / SFTP', right: 'Port 22' },
      { left: 'SMTP', right: 'Port 25' },
      { left: 'DNS', right: 'Port 53' }
    ]
  },
  {
    id: 'extensions',
    title: 'File Extensions ➔ MS Office Applications',
    pairs: [
      { left: '.docx', right: 'Microsoft Word' },
      { left: '.xlsx', right: 'Microsoft Excel' },
      { left: '.pptx', right: 'Microsoft PowerPoint' },
      { left: '.accdb', right: 'Microsoft Access' },
      { left: '.dotx', right: 'MS Word Template' }
    ]
  },
  {
    id: 'devices',
    title: 'Network Hardware ➔ OSI Layer',
    pairs: [
      { left: 'Hub / Repeater', right: 'Layer 1 (Physical)' },
      { left: 'Bridge / Switch', right: 'Layer 2 (Data Link)' },
      { left: 'Standard Router', right: 'Layer 3 (Network)' },
      { left: 'Protocol Gateway', right: 'Layer 4-7 (High-Level)' },
      { left: 'Network Interface Card', right: 'Layer 2 (Physical MAC)' }
    ]
  }
];

export default function DragAndDropMatcher() {
  const [activeSetIdx, setActiveSetIdx] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({}); // { 'HTTP': 'Port 80' }
  const [wrongAttempt, setWrongAttempt] = useState(false);

  const currentSet = MATCH_SETS[activeSetIdx];

  // Shuffle right items initially
  const [shuffledRights, setShuffledRights] = useState(() => {
    return [...currentSet.pairs.map(p => p.right)].sort(() => 0.5 - Math.random());
  });

  const handleSetChange = (idx) => {
    setActiveSetIdx(idx);
    setSelectedLeft(null);
    setMatchedPairs({});
    setWrongAttempt(false);
    setShuffledRights([...MATCH_SETS[idx].pairs.map(p => p.right)].sort(() => 0.5 - Math.random()));
  };

  const handleLeftClick = (item) => {
    if (matchedPairs[item]) return; // Already matched
    setSelectedLeft(item);
    setWrongAttempt(false);
  };

  const handleRightClick = (item) => {
    if (!selectedLeft) return;
    const pair = currentSet.pairs.find(p => p.left === selectedLeft);

    if (pair && pair.right === item) {
      // Correct match!
      const newMatches = { ...matchedPairs, [selectedLeft]: item };
      setMatchedPairs(newMatches);
      setSelectedLeft(null);
      setWrongAttempt(false);

      if (Object.keys(newMatches).length === currentSet.pairs.length) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      // Wrong match
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 800);
    }
  };

  const handleReset = () => {
    setSelectedLeft(null);
    setMatchedPairs({});
    setWrongAttempt(false);
    setShuffledRights([...currentSet.pairs.map(p => p.right)].sort(() => 0.5 - Math.random()));
  };

  const isCompleted = Object.keys(matchedPairs).length === currentSet.pairs.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Shuffle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Concept Matcher</h2>
            <p className="text-xs text-slate-400">
              Connect Protocols to Ports • Extensions to Apps • Hardware to OSI Layers
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Shuffle & Reset
        </button>
      </div>

      {/* Set Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {MATCH_SETS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSetChange(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeSetIdx === idx
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Left Column Items */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            Item / Concept
          </div>
          {currentSet.pairs.map(p => {
            const isMatched = Boolean(matchedPairs[p.left]);
            const isSelected = selectedLeft === p.left;

            return (
              <button
                key={p.left}
                onClick={() => handleLeftClick(p.left)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs font-bold flex items-center justify-between transition ${
                  isMatched
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 opacity-80'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-500'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{p.left}</span>
                {isMatched && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Column Items */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            Match / Property
          </div>
          {shuffledRights.map(r => {
            const isMatched = Object.values(matchedPairs).includes(r);

            return (
              <button
                key={r}
                onClick={() => handleRightClick(r)}
                disabled={isMatched || !selectedLeft}
                className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs font-bold flex items-center justify-between transition ${
                  isMatched
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 opacity-80'
                    : selectedLeft
                    ? 'bg-slate-950 border-cyan-500/40 text-slate-200 hover:border-cyan-500 hover:bg-cyan-500/10 cursor-pointer'
                    : 'bg-slate-950 border-slate-800 text-slate-500 cursor-not-allowed'
                } ${wrongAttempt && selectedLeft ? 'animate-shake border-red-500' : ''}`}
              >
                <span>{r}</span>
                {isMatched && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300 font-mono animate-fadeIn">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">Perfect Score! All pairs matched accurately.</span>
          </div>
          <button
            onClick={() => handleSetChange((activeSetIdx + 1) % MATCH_SETS.length)}
            className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 transition"
          >
            Next Set →
          </button>
        </div>
      )}
    </div>
  );
}
