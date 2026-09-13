import React, { useState, useMemo } from 'react';
import { BookOpen, Bookmark, CheckCircle, XCircle, HelpCircle, AlertTriangle, Filter, ChevronLeft, ChevronRight, Volume2, Share2 } from 'lucide-react';
import { toggleBookmark, recordMistake, getBookmarks } from '../../utils/dataManager';

export default function BilingualArena({ questions = [] }) {
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [languageMode, setLanguageMode] = useState('bilingual'); // 'en' | 'hi' | 'bilingual'
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  // Extract unique modules and badges for filters
  const modules = useMemo(() => ['All', ...Array.from(new Set(questions.map(q => q.module)))], [questions]);
  const badges = useMemo(() => ['All', ...Array.from(new Set(questions.map(q => q.badge)))], [questions]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchMod = selectedModule === 'All' || q.module === selectedModule;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchBadge = selectedBadge === 'All' || q.badge === selectedBadge;
      const matchSearch = !searchTerm || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (q.questionHindi && q.questionHindi.includes(searchTerm)) ||
        (q.tags && q.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchMod && matchDiff && matchBadge && matchSearch;
    });
  }, [questions, selectedModule, selectedDifficulty, selectedBadge, searchTerm]);

  const currQ = filteredQuestions[currentIdx] || null;
  const isBookmarked = currQ ? bookmarks.includes(currQ.id) : false;

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(idx);
    setShowSolution(true);

    if (currQ && idx !== currQ.correctOption) {
      recordMistake(currQ, idx);
    }
  };

  const handleToggleBookmark = () => {
    if (!currQ) return;
    const added = toggleBookmark(currQ.id);
    setBookmarks(getBookmarks());
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowSolution(false);
    setCurrentIdx(prev => Math.min(filteredQuestions.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setShowSolution(false);
    setCurrentIdx(prev => Math.max(0, prev - 1));
  };

  if (!currQ) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <p className="text-base font-semibold text-slate-300 mb-2">No questions matched your filter criteria.</p>
        <button
          onClick={() => { setSelectedModule('All'); setSelectedDifficulty('All'); setSelectedBadge('All'); setSearchTerm(''); }}
          className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      {/* Header Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bilingual Practice Arena</h2>
            <p className="text-xs text-slate-400">
              Exam-Grade MCQs with Trap Alerts, Concept Tips, and Real Source Badges
            </p>
          </div>
        </div>

        {/* Language Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setLanguageMode('en')}
            className={`px-3 py-1 rounded-lg transition ${languageMode === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguageMode('hi')}
            className={`px-3 py-1 rounded-lg transition ${languageMode === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguageMode('bilingual')}
            className={`px-3 py-1 rounded-lg transition ${languageMode === 'bilingual' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            द्विभाषी (Bilingual)
          </button>
        </div>
      </div>

      {/* Multi-Level Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-xs">
        {/* Module Filter */}
        <div>
          <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Module</label>
          <select
            value={selectedModule}
            onChange={(e) => { setSelectedModule(e.target.value); setCurrentIdx(0); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
          >
            {modules.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => { setSelectedDifficulty(e.target.value); setCurrentIdx(0); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Levels</option>
            <option value="Easy">Easy (Foundation)</option>
            <option value="Medium">Medium (Standard)</option>
            <option value="Hard">Hard (Challenger)</option>
          </select>
        </div>

        {/* Badge Filter */}
        <div>
          <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Source Authenticity</label>
          <select
            value={selectedBadge}
            onChange={(e) => { setSelectedBadge(e.target.value); setCurrentIdx(0); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
          >
            {badges.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Keyword Search</label>
          <input
            type="text"
            placeholder="Search keywords, shortcuts..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentIdx(0); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-500 font-bold">{currQ.id}</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
              currQ.badge === 'ACTUAL PYQ'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : currQ.badge === 'MEMORY-BASED PYQ'
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}>
              {currQ.badge}
            </span>
            <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
              ({currQ.source})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">
              Q {currentIdx + 1} of {filteredQuestions.length}
            </span>
            <button
              onClick={handleToggleBookmark}
              className={`p-1.5 rounded-lg border transition ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2 mb-6">
          {(languageMode === 'en' || languageMode === 'bilingual') && (
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currQ.question}
            </p>
          )}

          {(languageMode === 'hi' || languageMode === 'bilingual') && currQ.questionHindi && (
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {currQ.questionHindi}
            </p>
          )}
        </div>

        {/* Options List (5 Options standard for Bank Exams) */}
        <div className="space-y-2.5 mb-6">
          {currQ.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrect = idx === currQ.correctOption;
            const optHindi = currQ.optionsHindi ? currQ.optionsHindi[idx] : null;

            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';
            if (selectedOption !== null) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
              } else if (isChosen) {
                btnStyle = 'bg-red-500/20 border-red-500 text-red-200 font-bold';
              } else {
                btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={selectedOption !== null}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition ${btnStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                  selectedOption !== null && isCorrect
                    ? 'bg-emerald-500 text-slate-950'
                    : selectedOption !== null && isChosen
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>

                <div className="flex-1 text-xs sm:text-sm">
                  {(languageMode === 'en' || languageMode === 'bilingual') && (
                    <div>{opt}</div>
                  )}
                  {(languageMode === 'hi' || languageMode === 'bilingual') && optHindi && optHindi !== opt && (
                    <div className="text-slate-400 text-xs mt-0.5">{optHindi}</div>
                  )}
                </div>

                {selectedOption !== null && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : isChosen ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Solution Drawer */}
        {showSolution && (
          <div className="border-t border-slate-800/80 pt-5 space-y-4 animate-fadeIn">
            {/* Core Explanation */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Detailed Explanation & Working:</span>
              <p className="text-slate-200 mb-1 leading-relaxed">{currQ.solution}</p>
              {currQ.solutionHindi && (
                <p className="text-slate-400 leading-relaxed">{currQ.solutionHindi}</p>
              )}
            </div>

            {/* Concept Tip & Trap Alert */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {currQ.conceptTip && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Exam Concept Tip:</strong> {currQ.conceptTip}
                  </div>
                </div>
              )}

              {currQ.trapAlert && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Common Exam Trap:</strong> {currQ.trapAlert}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-xl border border-slate-700 text-slate-300 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-xs font-mono text-slate-500">
          Question {currentIdx + 1} / {filteredQuestions.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIdx >= filteredQuestions.length - 1}
          className="flex items-center gap-1.5 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-xs font-bold rounded-xl text-slate-950 transition"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
