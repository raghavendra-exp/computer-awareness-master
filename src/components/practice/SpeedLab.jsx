import React, { useState, useEffect } from 'react';
import { Zap, Timer, Flame, Trophy, RotateCcw, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const TIME_PER_QUESTION = 20; // 20 seconds standard bank speed target

export default function SpeedLab({ questions = [] }) {
  const [drillActive, setDrillActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Select 15 rapid-fire questions
  const [drillSet, setDrillSet] = useState([]);

  const startDrill = () => {
    // Pick 15 random questions biased towards shortcuts and fundamentals
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 15);
    setDrillSet(shuffled);
    setCurrentQIndex(0);
    setTimeLeft(TIME_PER_QUESTION);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnsweredCount(0);
    setUserAnswers([]);
    setIsFinished(false);
    setDrillActive(true);
  };

  useEffect(() => {
    let interval;
    if (drillActive && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeout();
            return TIME_PER_QUESTION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [drillActive, isFinished, currentQIndex]);

  const handleTimeout = () => {
    // Automatically register timeout as wrong
    recordAnswer(null, true);
  };

  const handleOptionClick = (optionIdx) => {
    recordAnswer(optionIdx, false);
  };

  const recordAnswer = (selectedIdx, timedOut) => {
    const q = drillSet[currentQIndex];
    const isCorrect = !timedOut && selectedIdx === q.correctOption;

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(st => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        if (next === 5 || next === 10) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        return next;
      });
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => [...prev, { q, selectedIdx, timedOut, isCorrect }]);
    setAnsweredCount(c => c + 1);

    if (currentQIndex + 1 < drillSet.length) {
      setCurrentQIndex(i => i + 1);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setIsFinished(true);
      setDrillActive(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const currQ = drillSet[currentQIndex];
  const timerPercentage = (timeLeft / TIME_PER_QUESTION) * 100;

  if (!drillActive && !isFinished) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-100 shadow-xl max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Rapid-Fire Speed Lab</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
          Train rapid recall for SBI/IBPS Clerk Mains. Solve <strong>15 questions</strong> with strict <strong>20 seconds per question</strong> countdown. No pausing!
        </p>

        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8 text-xs font-mono">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-slate-500 block text-[10px]">QUESTIONS</span>
            <strong className="text-base text-white">15</strong>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-slate-500 block text-[10px]">TIME / Q</span>
            <strong className="text-base text-amber-400">20s</strong>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-slate-500 block text-[10px]">TARGET SPEED</span>
            <strong className="text-base text-cyan-400">&lt;5 Mins</strong>
          </div>
        </div>

        <button
          onClick={startDrill}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20 transition duration-200"
        >
          Launch Speed Drill
        </button>
      </div>
    );
  }

  if (isFinished) {
    const accuracy = Math.round((score / drillSet.length) * 100);
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-slate-100 shadow-xl max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Speed Drill Completed!</h2>
          <p className="text-xs text-slate-400">Here is your speed and accuracy diagnostic scorecard:</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-mono">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px]">SCORE</span>
            <span className="text-2xl font-black text-emerald-400">{score} / {drillSet.length}</span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px]">ACCURACY</span>
            <span className="text-2xl font-black text-cyan-400">{accuracy}%</span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px]">BEST STREAK</span>
            <span className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-500" />
              {maxStreak}
            </span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px]">SPEED RATING</span>
            <span className="text-sm font-bold text-purple-400 mt-2 block">
              {accuracy >= 80 ? 'Mains Ranker' : accuracy >= 60 ? 'Standard' : 'Needs Drill'}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={startDrill}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition"
          >
            <RotateCcw className="w-4 h-4" /> Try Another Rapid Drill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-3xl mx-auto">
      {/* Timer Bar & Streak Banner */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-slate-400">
            Q {currentQIndex + 1} / {drillSet.length}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold font-mono text-amber-400 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Streak: {streak}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <Timer className="w-4 h-4 text-cyan-400" />
          <span className={`text-base ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Visual countdown progress bar */}
      <div className="w-full bg-slate-950 rounded-full h-1.5 mb-6 overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-cyan-500'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-relaxed">
          {currQ.question}
        </h3>
        {currQ.questionHindi && (
          <p className="text-xs sm:text-sm text-slate-400 mb-6 font-normal">
            {currQ.questionHindi}
          </p>
        )}

        <div className="space-y-2.5">
          {currQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-cyan-500/10 hover:border-cyan-500/60 text-slate-200 text-left text-xs sm:text-sm font-medium flex items-center gap-3 transition"
            >
              <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
