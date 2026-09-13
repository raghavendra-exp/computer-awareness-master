import React, { useState, useMemo } from 'react';
import { Layers, RotateCcw, Check, X, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { recordCardReview, getCardsDueForReview, getLeitnerStats, getLeitnerDeck } from '../../utils/spacedRepetitionEngine';

export default function FlashcardDeck({ abbreviations = [], shortcuts = [] }) {
  // Combine abbreviations and shortcuts into flashcard items
  const allCards = useMemo(() => {
    const list = [];
    abbreviations.forEach((a, i) => {
      list.push({
        id: `CARD-ABBR-${i}`,
        type: 'Abbreviation',
        category: a.category,
        front: a.term,
        back: a.fullForm,
        note: `Category: ${a.category}`
      });
    });
    shortcuts.forEach((s, i) => {
      list.push({
        id: `CARD-SC-${i}`,
        type: 'Shortcut',
        category: s.category || 'General',
        front: s.keys,
        back: s.action,
        note: `Scope: ${s.category || 'Windows / Office'}`
      });
    });
    return list;
  }, [abbreviations, shortcuts]);

  const [selectedBoxFilter, setSelectedBoxFilter] = useState('due'); // 'due' | 'all' | 1 | 2 | 3 | 4 | 5
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState(getLeitnerStats());
  const deck = getLeitnerDeck();

  // Filter cards
  const visibleCards = useMemo(() => {
    if (selectedBoxFilter === 'due') {
      return getCardsDueForReview(allCards);
    }
    if (selectedBoxFilter === 'all') {
      return allCards;
    }
    const targetBox = parseInt(selectedBoxFilter, 10);
    return allCards.filter(c => (deck[c.id]?.box || 1) === targetBox);
  }, [allCards, selectedBoxFilter, deck]);

  const currentCard = visibleCards[currentIdx] || null;

  const handleReview = (wasCorrect) => {
    if (!currentCard) return;
    recordCardReview(currentCard.id, wasCorrect);
    setStats(getLeitnerStats());
    setIsFlipped(false);
    if (currentIdx + 1 < visibleCards.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Leitner 5-Box Spaced Repetition Flashcards</h2>
            <p className="text-xs text-slate-400">
              Active Recall Flashcards for Keyboard Shortcuts, Full Forms & Port Numbers
            </p>
          </div>
        </div>

        {/* Global Leitner Stats Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
            Mastered (Box 5): <strong className="text-emerald-400">{stats.masteredCards}</strong>
          </span>
          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-bold">
            Accuracy: {stats.accuracy}%
          </span>
        </div>
      </div>

      {/* 5 Leitner Boxes Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-6 text-xs font-mono">
        <button
          onClick={() => { setSelectedBoxFilter('due'); setCurrentIdx(0); setIsFlipped(false); }}
          className={`p-2.5 rounded-xl border text-center transition ${
            selectedBoxFilter === 'due'
              ? 'bg-purple-500 text-slate-950 font-bold shadow-md shadow-purple-500/20'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div>DUE FOR REVIEW</div>
          <div className="text-sm font-black mt-0.5">{getCardsDueForReview(allCards).length}</div>
        </button>

        {[1, 2, 3, 4, 5].map(boxNum => (
          <button
            key={boxNum}
            onClick={() => { setSelectedBoxFilter(boxNum); setCurrentIdx(0); setIsFlipped(false); }}
            className={`p-2.5 rounded-xl border text-center transition ${
              selectedBoxFilter === boxNum
                ? 'bg-purple-500 text-slate-950 font-bold shadow-md shadow-purple-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div>BOX {boxNum} {boxNum === 5 ? '★' : ''}</div>
            <div className="text-sm font-black mt-0.5">{stats.boxCounts[boxNum] || 0}</div>
          </button>
        ))}
      </div>

      {/* Flashcard Active View */}
      {currentCard ? (
        <div className="max-w-xl mx-auto mb-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-8 min-h-[260px] flex flex-col items-center justify-between text-center transition duration-200 shadow-xl group"
          >
            <div className="flex items-center justify-between w-full text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-purple-400 font-bold">
                {currentCard.type}
              </span>
              <span className="text-slate-500">
                Box {deck[currentCard.id]?.box || 1} • Card {currentIdx + 1} of {visibleCards.length}
              </span>
            </div>

            <div className="my-auto py-6">
              {!isFlipped ? (
                <>
                  <span className="text-xs uppercase font-mono text-slate-500 tracking-wider block mb-2">Prompt (Click to Reveal)</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wide group-hover:text-purple-300 transition">
                    {currentCard.front}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs uppercase font-mono text-emerald-400 tracking-wider block mb-2">Answer</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300 mb-2 leading-relaxed">
                    {currentCard.back}
                  </div>
                  <p className="text-xs text-slate-400">{currentCard.note}</p>
                </>
              )}
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              {isFlipped ? 'How did you do?' : 'Click card to flip ⟳'}
            </div>
          </div>

          {/* Action Buttons: Forgot It vs Knew It */}
          {isFlipped && (
            <div className="grid grid-cols-2 gap-3 mt-4 animate-fadeIn">
              <button
                onClick={() => handleReview(false)}
                className="py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <X className="w-4 h-4 text-red-400" />
                Forgot It (Reset to Box 1)
              </button>

              <button
                onClick={() => handleReview(true)}
                className="py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                Knew It! (Advance Box)
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white mb-1">No cards due in this box!</p>
          <p className="text-xs text-slate-500 mb-4">You have reviewed all scheduled cards. Switch to 'All Cards' or Box 1.</p>
          <button
            onClick={() => setSelectedBoxFilter('all')}
            className="px-4 py-2 bg-purple-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-purple-400 transition"
          >
            Review All Flashcards
          </button>
        </div>
      )}
    </div>
  );
}
