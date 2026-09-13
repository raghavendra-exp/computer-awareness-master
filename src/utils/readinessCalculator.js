/**
 * readinessCalculator.js - Computes the Computer Readiness Score (0-100)
 * Evaluates accuracy, speed, syllabus breadth, and streak to guide the user.
 */
import { getMockHistory, getMistakes, getDailyStreak } from './dataManager';
import { getLeitnerStats } from './spacedRepetitionEngine';

export const calculateReadiness = (allQuestions = []) => {
  const mockHistory = getMockHistory();
  const mistakes = getMistakes();
  const streak = getDailyStreak();
  const leitnerStats = getLeitnerStats();

  // 1. Mock Performance Component (35% weight)
  let mockScore = 50; // Baseline default
  let totalMockAttempts = mockHistory.length;
  let avgMockAccuracy = 0;
  let avgSecondsPerQ = 35;

  if (totalMockAttempts > 0) {
    const totalAcc = mockHistory.reduce((acc, m) => acc + (m.accuracy || (m.score / m.total) * 100 || 0), 0);
    avgMockAccuracy = totalAcc / totalMockAttempts;

    const totalSec = mockHistory.reduce((acc, m) => acc + (m.timeTakenSeconds / (m.total || 1) || 30), 0);
    avgSecondsPerQ = totalSec / totalMockAttempts;

    // Scale mock accuracy (target 85%+ = 35 pts)
    mockScore = Math.min(35, (avgMockAccuracy / 100) * 35);
  }

  // 2. Syllabus Coverage Component (30% weight)
  // Check how many distinct modules have been tested/practiced
  const practicedIds = new Set([
    ...mistakes.map(m => m.questionId),
    ...mockHistory.flatMap(m => m.questionIds || [])
  ]);
  const totalQuestionsCount = Math.max(1, allQuestions.length);
  const coverageRatio = Math.min(1, practicedIds.size / (totalQuestionsCount * 0.4)); // 40% of bank = 100% coverage pts
  const coverageScore = coverageRatio * 30;

  // 3. Speed & Time Efficiency Component (20% weight)
  // Target: 20-25 seconds per question for Computer section in RRB Mains
  let speedScore = 15;
  if (avgSecondsPerQ <= 22) speedScore = 20;
  else if (avgSecondsPerQ <= 30) speedScore = 17;
  else if (avgSecondsPerQ <= 45) speedScore = 13;
  else speedScore = 8;

  // 4. Retention, Streak & Spaced Repetition (15% weight)
  const streakDays = streak.currentStreak || 1;
  const streakPts = Math.min(8, streakDays * 1.6);
  const flashcardPts = Math.min(7, (leitnerStats.masteredCards / 30) * 7);
  const retentionScore = streakPts + flashcardPts;

  // Total readiness
  const totalScore = Math.min(100, Math.round(mockScore + coverageScore + speedScore + retentionScore));

  // Determine Grade
  let grade = 'Beginner';
  let color = 'text-amber-400';
  let badgeText = 'Level 1: Novice';
  if (totalScore >= 88) {
    grade = 'Mains Ranker';
    color = 'text-emerald-400';
    badgeText = 'Score 18+/20 Potential (Top 1%)';
  } else if (totalScore >= 75) {
    grade = 'Exam Ready';
    color = 'text-cyan-400';
    badgeText = 'Score 15-17.5/20 Potential';
  } else if (totalScore >= 55) {
    grade = 'Intermediate';
    color = 'text-blue-400';
    badgeText = 'Score 11-14/20 Potential';
  }

  // Diagnostic Weakness Breakdown
  // Group mistakes by module
  const mistakesByModule = {};
  mistakes.forEach(m => {
    const mod = m.module || 'General';
    mistakesByModule[mod] = (mistakesByModule[mod] || 0) + (m.mistakeCount || 1);
  });

  const sortedWeaknesses = Object.entries(mistakesByModule)
    .map(([mod, count]) => ({ module: mod, errorCount: count }))
    .sort((a, b) => b.errorCount - a.errorCount);

  return {
    score: totalScore,
    grade,
    color,
    badgeText,
    breakdown: {
      mockAccuracy: Math.round(mockScore),
      syllabusBreadth: Math.round(coverageScore),
      speedEfficiency: Math.round(speedScore),
      retentionStreak: Math.round(retentionScore)
    },
    metrics: {
      avgAccuracy: Math.round(avgMockAccuracy),
      avgSecondsPerQuestion: Math.round(avgSecondsPerQ),
      totalMocksCompleted: totalMockAttempts,
      activeStreak: streakDays,
      unresolvedMistakesCount: mistakes.length
    },
    topWeaknesses: sortedWeaknesses.slice(0, 3)
  };
};
