//   /**
//    * AI's turn to make a guess based on current game state
//    * @param {Array} playerGuesses - Player's guess history
//    */

import { filterWords, getOptimalGuess, getFeedback } from "./gameLogic";

export const makeAiGuess = (
  playerGuesses,
  secretWord,
  difficulty,
  wordList
) => {
  let possibleWords = [...wordList];

  for (const guess of playerGuesses) {
    const feedback = getFeedback(guess, secretWord);
    possibleWords = filterWords(possibleWords, guess, feedback);
  }

  if (possibleWords.length === 0) return "ERROR";
  if (possibleWords.length === 1) return possibleWords[0];

  switch (difficulty) {
    case "easy":
      return possibleWords[Math.floor(Math.random() * possibleWords.length)];
    case "medium":
      return Math.random() > 0.3
        ? getOptimalGuess(possibleWords)
        : possibleWords[Math.floor(Math.random() * possibleWords.length)];
    case "hard":
      return getOptimalGuess(possibleWords);
    default:
      return possibleWords[0];
  }
};
