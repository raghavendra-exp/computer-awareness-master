import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, HelpCircle, Trophy } from 'lucide-react';
import { getStoredData, setStoredData } from '../../utils/dataManager';

const PROGRESS_KEY = 'cam_study_plan_progress_v1';

export default function StudyRoadmaps({ studyPlansData }) {
  const [selectedPlanId, setSelectedPlanId] = useState('plan-30-days');
  const [completedTasks, setCompletedTasks] = useState(() => getStoredData(PROGRESS_KEY, {}));

  if (!studyPlansData) return null;

  const currentPlan = studyPlansData.plans.find(p => p.id === selectedPlanId) || studyPlansData.plans[0];

  const handleToggleTask = (taskId) => {
    const updated = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    setCompletedTasks(updated);
    setStoredData(PROGRESS_KEY, updated);
  };

  // Calculate completion percentage
  let totalTasks = 0;
  let finishedTasks = 0;

  if (currentPlan.weeks) {
    currentPlan.weeks.forEach(w => {
      w.days.forEach(d => {
        totalTasks++;
        if (completedTasks[`${currentPlan.id}-day-${d.day}`]) finishedTasks++;
      });
    });
  } else if (currentPlan.days) {
    currentPlan.days.forEach(d => {
      totalTasks++;
      if (completedTasks[`${currentPlan.id}-day-${d.day}`]) finishedTasks++;
    });
  }

  const completionPct = totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Study Plans & Revision Roadmaps</h2>
            <p className="text-xs text-slate-400">
              Interactive Day-by-Day Syllabus Roadmaps with Checklist Tracking
            </p>
          </div>
        </div>

        {/* Plan Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {studyPlansData.plans.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanId(p.id)}
              className={`px-3 py-1 rounded-lg transition ${
                selectedPlanId === p.id ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.id === 'plan-30-days' ? '30-Day Foundation' : '15-Day Sprint'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview & Progress Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-bold text-white">{currentPlan.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentPlan.target}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block font-mono">PROGRESS</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{completionPct}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>{finishedTasks} of {totalTasks} days completed</span>
          <span>Daily Commitment: {currentPlan.dailyCommitment}</span>
        </div>
      </div>

      {/* Week / Days Checklist Cards */}
      <div className="space-y-6">
        {currentPlan.weeks ? (
          currentPlan.weeks.map((week, wIdx) => (
            <div key={wIdx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-xs font-mono uppercase font-bold text-cyan-400 mb-3 tracking-wider">
                Week {week.week}: {week.title}
              </h4>
              <div className="space-y-2.5">
                {week.days.map(d => {
                  const taskId = `${currentPlan.id}-day-${d.day}`;
                  const isDone = Boolean(completedTasks[taskId]);
                  return (
                    <div
                      key={d.day}
                      onClick={() => handleToggleTask(taskId)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <button className="mt-0.5 text-emerald-400">
                        {isDone ? <CheckCircle2 className="w-4 h-4 fill-emerald-500/20" /> : <Circle className="w-4 h-4 text-slate-600" />}
                      </button>
                      <div className="text-xs">
                        <span className="font-mono font-bold mr-2 text-white">Day {d.day}:</span>
                        <span className="font-semibold text-white">{d.topic}</span>
                        <span className="text-slate-400 block mt-0.5">{d.action}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            {currentPlan.days.map(d => {
              const taskId = `${currentPlan.id}-day-${d.day}`;
              const isDone = Boolean(completedTasks[taskId]);
              return (
                <div
                  key={d.day}
                  onClick={() => handleToggleTask(taskId)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <button className="text-emerald-400">
                    {isDone ? <CheckCircle2 className="w-4 h-4 fill-emerald-500/20" /> : <Circle className="w-4 h-4 text-slate-600" />}
                  </button>
                  <div className="text-xs flex items-center gap-2">
                    <span className="font-mono font-bold text-white">Day {d.day}:</span>
                    <span>{d.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
