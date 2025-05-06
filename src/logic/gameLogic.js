/**
 * Generates feedback for a guess compared to the secret word
 * @param {string} guess - The guessed word
 * @param {string} secret - The secret word
 * @returns {Array} Feedback array with "correct", "present", or "absent" for each letter
 */

export const getFeedback = (guess, secret) => {
  const feedback = Array(5).fill(null);
  const secretLetters = secret.split("");
  const guessLetters = guess.split("");

  // First pass: mark correct letters (exact position matches)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === secretLetters[i]) {
      feedback[i] = "correct";
      secretLetters[i] = null; // Mark as used
    }
  }

  // Second pass: mark present letters (correct letter, wrong position)
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "correct") continue; // Skip already marked letters

    const indexInSecret = secretLetters.indexOf(guessLetters[i]);
    if (indexInSecret !== -1) {
      feedback[i] = "present";
      secretLetters[indexInSecret] = null; // Mark as used
    } else {
      feedback[i] = "absent";
    }
  }

  return feedback;
};

/**
 * Filters possible words based on feedback from a guess
 * @param {Array} words - List of possible words
 * @param {string} guess - The guessed word
 * @param {Array} feedback - Feedback for the guessed word
 * @returns {Array} Filtered list of possible words
 */
export const filterWords = (words, guess, feedback) => {
  return words.filter((word) => {
    // Check each candidate word against the feedback rules
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];
      const feedbackCode = feedback[i];

      // Rule 1: Correct position (🟩)
      if (feedbackCode === "correct" && word[i] !== letter) {
        return false; // Eliminate words without this letter in exact position
      }

      // Rule 2: Present but wrong position (🟨)
      if (feedbackCode === "present") {
        // Letter must exist in word but not in this position
        if (!word.includes(letter) || word[i] === letter) {
          return false;
        }
      }

      // Rule 3: Absent (⬛)
      if (feedbackCode === "absent") {
        // Count how many times this letter was marked as present/correct
        const presentCount = feedback.filter(
          (val, idx) =>
            guess[idx] === letter && (val === "correct" || val === "present")
        ).length;

        // Count how many times letter appears in candidate word
        const letterCountInWord = word
          .split("")
          .filter((l) => l === letter).length;

        // Eliminate words with more copies than feedback suggests
        if (letterCountInWord > presentCount) {
          return false;
        }
      }
    }

    return true; // Keep word if all checks pass
  });
};

/**
 * Selects the most optimal guess using information theory (entropy)
 * @param {Array} possibleWords - List of remaining possible words
 * @returns {string} The optimal guess
 */
export const getOptimalGuess = (possibleWords) => {
  // Return immediately if few options remain
  if (possibleWords.length <= 2) return possibleWords[0];

  let bestGuess = possibleWords[0];
  let bestScore = -1;

  // Limit to first 20 words for performance
  const wordsToCheck =
    possibleWords.length > 20 ? possibleWords.slice(0, 20) : possibleWords;

  // Evaluate each potential guess
  for (const word of wordsToCheck) {
    const feedbackCounts = {}; // Track frequency of each feedback pattern

    // Test this guess against all possible secret words
    for (const possibleSecret of possibleWords) {
      const feedback = getFeedback(word, possibleSecret);
      const key = JSON.stringify(feedback);
      feedbackCounts[key] = (feedbackCounts[key] || 0) + 1;
    }

    // Calculate information value (entropy) of this guess
    let entropy = 0;
    for (const key in feedbackCounts) {
      const prob = feedbackCounts[key] / possibleWords.length;
      entropy -= prob * Math.log2(prob); // Information theory formula
    }

    // Update best guess if this one is better
    if (entropy > bestScore) {
      bestScore = entropy;
      bestGuess = word;
    }
  }

  return bestGuess;
};
