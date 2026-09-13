import React, { useState, useEffect } from 'react';
import { Timer, CheckSquare, Bookmark, AlertCircle, HelpCircle, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { saveMockResult } from '../../utils/dataManager';

export default function ExamSimulator({ questions = [], preset = null, onFinishMock }) {
  // Config from preset
  const totalQuestionsNeeded = preset?.questionCount || 40;
  const durationSec = (preset?.durationMinutes || 20) * 60;
  const markCorrect = preset?.marksPerQuestion || 0.5;
  const markNegative = preset?.negativeMark || 0.125;

  // Selected questions for this mock
  const [mockQuestions] = useState(() => {
    return [...questions].sort(() => 0.5 - Math.random()).slice(0, totalQuestionsNeeded);
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [answers, setAnswers] = useState({}); // { [qId]: selectedOptionIndex }
  const [reviewStatus, setReviewStatus] = useState({}); // { [qId]: boolean }
  const [visitedStatus, setVisitedStatus] = useState({ 0: true }); // { [index]: boolean }
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [languageMode, setLanguageMode] = useState('bilingual'); // 'en' | 'hi' | 'bilingual'

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (optIdx) => {
    const q = mockQuestions[currentIdx];
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
  };

  const handleClearResponse = () => {
    const q = mockQuestions[currentIdx];
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[q.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    const q = mockQuestions[currentIdx];
    setReviewStatus(prev => ({ ...prev, [q.id]: !prev[q.id] }));
  };

  const handleSaveAndNext = () => {
    if (currentIdx + 1 < mockQuestions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setVisitedStatus(prev => ({ ...prev, [nextIdx]: true }));
    }
  };

  const handleJumpToQuestion = (idx) => {
    setCurrentIdx(idx);
    setVisitedStatus(prev => ({ ...prev, [idx]: true }));
  };

  const handleSubmit = () => {
    // Calculate final score
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    mockQuestions.forEach(q => {
      const userAns = answers[q.id];
      if (userAns === undefined || userAns === null) {
        unattemptedCount++;
      } else if (userAns === q.correctOption) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const finalMarks = Math.max(0, (correctCount * markCorrect) - (wrongCount * markNegative));
    const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
    const timeTaken = durationSec - timeLeft;

    const result = {
      presetTitle: preset?.title || 'IBPS RRB Clerk Mains Mock',
      total: mockQuestions.length,
      correctCount,
      wrongCount,
      unattemptedCount,
      marks: Math.round(finalMarks * 100) / 100,
      totalPossibleMarks: mockQuestions.length * markCorrect,
      accuracy,
      timeTakenSeconds: timeTaken,
      questionIds: mockQuestions.map(q => q.id),
      answers,
      mockQuestions
    };

    saveMockResult(result);
    if (onFinishMock) onFinishMock(result);
  };

  const currQ = mockQuestions[currentIdx];
  const userAns = answers[currQ?.id];
  const isMarkedReview = Boolean(reviewStatus[currQ?.id]);

  // Statistics for IBPS Palette
  const answeredCount = Object.keys(answers).length;
  const markedReviewCount = Object.values(reviewStatus).filter(Boolean).length;
  const notAnsweredCount = Object.keys(visitedStatus).length - answeredCount;
  const notVisitedCount = mockQuestions.length - Object.keys(visitedStatus).length;

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      {/* Top Standard IBPS Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            {preset?.badge || 'Mains Exam Simulator'}
          </div>
          <h2 className="text-lg font-bold text-white">
            {preset?.title || 'IBPS RRB Office Assistant Mains Mock'}
          </h2>
        </div>

        {/* Timer & Language Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Timer className="w-4 h-4 text-cyan-400" />
            <span className={`font-bold text-sm ${timeLeft < 180 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2 py-0.5 rounded ${languageMode === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguageMode('hi')}
              className={`px-2 py-0.5 rounded ${languageMode === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguageMode('bilingual')}
              className={`px-2 py-0.5 rounded ${languageMode === 'bilingual' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              BOTH
            </button>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Examination Layout: Question Area (Left) + Question Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Question Pane (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-4">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
              <span className="text-white font-bold">
                Question {currentIdx + 1} of {mockQuestions.length}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">+{markCorrect} Marks</span>
                <span className="text-red-400">-{markNegative} Negative</span>
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-2 mb-6">
              {(languageMode === 'en' || languageMode === 'bilingual') && (
                <p className="text-base font-bold text-white leading-relaxed">
                  {currQ.question}
                </p>
              )}
              {(languageMode === 'hi' || languageMode === 'bilingual') && currQ.questionHindi && (
                <p className="text-sm text-slate-300 font-normal leading-relaxed">
                  {currQ.questionHindi}
                </p>
              )}
            </div>

            {/* 5 Radio Options */}
            <div className="space-y-2.5">
              {currQ.options.map((opt, idx) => {
                const isSelected = userAns === idx;
                const optHindi = currQ.optionsHindi ? currQ.optionsHindi[idx] : null;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold ring-1 ring-cyan-500'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 border ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-bold' : 'border-slate-600 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1 text-xs sm:text-sm">
                      <div>{opt}</div>
                      {languageMode === 'bilingual' && optHindi && optHindi !== opt && (
                        <div className="text-slate-400 text-xs font-normal mt-0.5">{optHindi}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Control Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleReview}
                className={`px-3 py-2 rounded-xl border text-xs font-bold transition ${
                  isMarkedReview
                    ? 'bg-purple-500 text-slate-950 font-black'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-purple-500'
                }`}
              >
                {isMarkedReview ? '★ Marked for Review' : 'Mark for Review'}
              </button>
              <button
                onClick={handleClearResponse}
                disabled={userAns === undefined}
                className="px-3 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-40 rounded-xl text-xs font-semibold transition"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleJumpToQuestion(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-xl border border-slate-700 text-slate-300 transition"
              >
                Previous
              </button>
              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition"
              >
                Save & Next →
              </button>
            </div>
          </div>
        </div>

        {/* Right Standard IBPS Question Palette (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-800 pb-2">
              Question Palette
            </h4>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-red-500" />
                <span>Not Answered ({notAnsweredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-purple-500" />
                <span>Marked for Review ({markedReviewCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-800" />
                <span>Not Visited ({notVisitedCount})</span>
              </div>
            </div>

            {/* 40-Question Buttons Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto p-1">
              {mockQuestions.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isRev = Boolean(reviewStatus[q.id]);
                const isCur = idx === currentIdx;
                const isVis = Boolean(visitedStatus[idx]);

                let btnBg = 'bg-slate-800 text-slate-400 border-slate-700'; // not visited
                if (isAns && isRev) btnBg = 'bg-purple-600 text-white font-bold ring-2 ring-emerald-400';
                else if (isRev) btnBg = 'bg-purple-600 text-white font-bold';
                else if (isAns) btnBg = 'bg-emerald-600 text-white font-bold';
                else if (isVis) btnBg = 'bg-red-600 text-white font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 rounded-lg border text-center font-mono text-xs font-bold transition ${btnBg} ${
                      isCur ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition"
            >
              Submit Full Test
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-100">
            <h3 className="text-lg font-bold text-white mb-2">Confirm Test Submission</h3>
            <p className="text-xs text-slate-400 mb-4">
              Are you sure you want to submit your test? Here is your section summary:
            </p>

            <div className="space-y-2 font-mono text-xs mb-6">
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-400">Total Questions</span>
                <span className="text-white font-bold">{mockQuestions.length}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-emerald-400">Answered</span>
                <span className="text-emerald-400 font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-purple-400">Marked for Review</span>
                <span className="text-purple-400 font-bold">{markedReviewCount}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-red-400">Unanswered</span>
                <span className="text-red-400 font-bold">{mockQuestions.length - answeredCount}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-cyan-400">Time Remaining</span>
                <span className="text-cyan-400 font-bold">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition"
              >
                Resume Test
              </button>
              <button
                onClick={() => { setShowSubmitModal(false); handleSubmit(); }}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition"
              >
                Confirm & View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
