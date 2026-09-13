/**
 * spacedRepetitionEngine.js - Leitner 5-Box Spaced Repetition Algorithm
 * Tracks flashcards and shortcut mastery across 5 progressive retention intervals.
 */
import { getStoredData, setStoredData } from './dataManager';

const LEITNER_KEY = 'cam_leitner_boxes_v1';

// Interval in days for each Leitner box
const BOX_INTERVALS = {
  1: 1,   // Daily review
  2: 2,   // Review every 2 days
  3: 4,   // Review every 4 days
  4: 7,   // Review weekly
  5: 14   // Review bi-weekly (Mastered)
};

export const getLeitnerDeck = () => {
  return getStoredData(LEITNER_KEY, {});
};

export const recordCardReview = (cardId, wasCorrect) => {
  const deck = getLeitnerDeck();
  const currentCard = deck[cardId] || {
    box: 1,
    reviewCount: 0,
    correctCount: 0,
    lastReviewed: 0,
    nextReviewDue: 0
  };

  const now = Date.now();
  let nextBox = currentCard.box;

  if (wasCorrect) {
    // Advance to next box up to max 5
    nextBox = Math.min(5, currentCard.box + 1);
  } else {
    // Reset back to Box 1 on failure
    nextBox = 1;
  }

  const intervalDays = BOX_INTERVALS[nextBox];
  const nextDueDate = now + (intervalDays * 24 * 60 * 60 * 1000);

  const updatedCard = {
    box: nextBox,
    reviewCount: currentCard.reviewCount + 1,
    correctCount: currentCard.correctCount + (wasCorrect ? 1 : 0),
    lastReviewed: now,
    nextReviewDue: nextDueDate
  };

  deck[cardId] = updatedCard;
  setStoredData(LEITNER_KEY, deck);
  return updatedCard;
};

export const getCardsDueForReview = (cardsList) => {
  const deck = getLeitnerDeck();
  const now = Date.now();

  return cardsList.filter(card => {
    const status = deck[card.id];
    if (!status) return true; // Brand new card never reviewed
    return now >= status.nextReviewDue;
  });
};

export const getLeitnerStats = () => {
  const deck = getLeitnerDeck();
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalReviews = 0;
  let totalCorrect = 0;

  Object.values(deck).forEach(card => {
    if (counts[card.box] !== undefined) {
      counts[card.box]++;
    }
    totalReviews += card.reviewCount || 0;
    totalCorrect += card.correctCount || 0;
  });

  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

  return {
    boxCounts: counts,
    totalCardsTracked: Object.keys(deck).length,
    masteredCards: counts[5] || 0,
    totalReviews,
    accuracy
  };
};
