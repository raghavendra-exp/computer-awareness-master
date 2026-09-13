/**
 * dataManager.js - Central persistence and state coordinator
 * Zero backend, 100% client-side offline storage via localStorage
 */

const STORAGE_KEYS = {
  BOOKMARKS: 'cam_bookmarks_v1',
  MISTAKES: 'cam_mistakes_v1',
  MOCK_HISTORY: 'cam_mock_history_v1',
  FLASHCARDS: 'cam_leitner_boxes_v1',
  SETTINGS: 'cam_user_settings_v1',
  CUSTOM_QUESTIONS: 'cam_custom_questions_v1',
  DAILY_STREAK: 'cam_daily_streak_v1',
  TOPIC_PROGRESS: 'cam_topic_progress_v1'
};

export const getStoredData = (key, defaultVal) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (e) {
    console.error('Failed to read from localStorage:', key, e);
    return defaultVal;
  }
};

export const setStoredData = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', key, e);
    return false;
  }
};

// Bookmarks management
export const getBookmarks = () => getStoredData(STORAGE_KEYS.BOOKMARKS, []);

export const toggleBookmark = (questionId) => {
  const current = getBookmarks();
  const exists = current.includes(questionId);
  const updated = exists ? current.filter(id => id !== questionId) : [...current, questionId];
  setStoredData(STORAGE_KEYS.BOOKMARKS, updated);
  return !exists;
};

// Mistakes Notebook
export const getMistakes = () => getStoredData(STORAGE_KEYS.MISTAKES, []);

export const recordMistake = (question, userSelectedOption) => {
  const current = getMistakes();
  const existingIdx = current.findIndex(m => m.questionId === question.id);
  const mistakeRecord = {
    questionId: question.id,
    questionText: question.question,
    questionHindi: question.questionHindi,
    module: question.module,
    category: question.category,
    correctOption: question.correctOption,
    userSelectedOption,
    options: question.options,
    solution: question.solution,
    trapAlert: question.trapAlert,
    timestamp: Date.now(),
    mistakeCount: existingIdx >= 0 ? (current[existingIdx].mistakeCount || 1) + 1 : 1
  };

  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = mistakeRecord;
  } else {
    updated = [mistakeRecord, ...current];
  }
  setStoredData(STORAGE_KEYS.MISTAKES, updated);
  return updated;
};

export const removeMistake = (questionId) => {
  const current = getMistakes();
  const updated = current.filter(m => m.questionId !== questionId);
  setStoredData(STORAGE_KEYS.MISTAKES, updated);
  return updated;
};

// Mock Test History
export const getMockHistory = () => getStoredData(STORAGE_KEYS.MOCK_HISTORY, []);

export const saveMockResult = (result) => {
  const history = getMockHistory();
  const updated = [{ ...result, id: `MOCK-${Date.now()}`, date: new Date().toISOString() }, ...history];
  setStoredData(STORAGE_KEYS.MOCK_HISTORY, updated);
  updateDailyStreak();
  return updated;
};

// Daily Streak Tracker
export const getDailyStreak = () => {
  return getStoredData(STORAGE_KEYS.DAILY_STREAK, {
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalSessions: 1,
    history: [new Date().toISOString().split('T')[0]]
  });
};

export const updateDailyStreak = () => {
  const streak = getDailyStreak();
  const today = new Date().toISOString().split('T')[0];
  if (streak.lastActiveDate === today) return streak;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = streak.currentStreak;
  if (streak.lastActiveDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }

  const updated = {
    currentStreak: newStreak,
    lastActiveDate: today,
    totalSessions: (streak.totalSessions || 0) + 1,
    history: Array.from(new Set([...(streak.history || []), today]))
  };
  setStoredData(STORAGE_KEYS.DAILY_STREAK, updated);
  return updated;
};

// User Settings
export const getUserSettings = () => {
  return getStoredData(STORAGE_KEYS.SETTINGS, {
    language: 'en', // 'en' | 'hi' | 'bilingual'
    theme: 'dark',  // 'dark' | 'light'
    soundEffects: true,
    hapticFeedback: false,
    timerSpeed: 'normal'
  });
};

export const saveUserSettings = (newSettings) => {
  const current = getUserSettings();
  const updated = { ...current, ...newSettings };
  setStoredData(STORAGE_KEYS.SETTINGS, updated);
  return updated;
};

// Backup & Restore
export const exportEntireUserData = () => {
  const backup = {
    exportDate: new Date().toISOString(),
    appVersion: '2026.1',
    bookmarks: getBookmarks(),
    mistakes: getMistakes(),
    mockHistory: getMockHistory(),
    streak: getDailyStreak(),
    settings: getUserSettings(),
    flashcards: getStoredData(STORAGE_KEYS.FLASHCARDS, {})
  };
  return JSON.stringify(backup, null, 2);
};

export const importUserData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.bookmarks) setStoredData(STORAGE_KEYS.BOOKMARKS, data.bookmarks);
    if (data.mistakes) setStoredData(STORAGE_KEYS.MISTAKES, data.mistakes);
    if (data.mockHistory) setStoredData(STORAGE_KEYS.MOCK_HISTORY, data.mockHistory);
    if (data.streak) setStoredData(STORAGE_KEYS.DAILY_STREAK, data.streak);
    if (data.settings) setStoredData(STORAGE_KEYS.SETTINGS, data.settings);
    if (data.flashcards) setStoredData(STORAGE_KEYS.FLASHCARDS, data.flashcards);
    return { success: true, message: 'All user data restored successfully!' };
  } catch (err) {
    return { success: false, message: 'Invalid backup JSON file: ' + err.message };
  }
};

export const clearAllUserData = () => {
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
};
