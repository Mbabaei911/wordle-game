import React, { useState, useEffect } from "react";
import "./App.css";
import WordList from "./wordList";

/**
 * Wordle Challenge Game
 * A React implementation of Wordle where players compete against an AI opponent
*/

const WORD_LIST= WordList(); // Call the function to get the array

// Difficulty levels configuration
const DIFFICULTY = {
  EASY: "easy",      // AI makes random guesses
  MEDIUM: "medium",  // AI mixes random and optimal guesses (70% optimal)
  HARD: "hard",      // AI always makes optimal guesses
};

function App() {
  // Game state management
  const [secretWord, setSecretWord] = useState("");        // The target word to guess
  const [playerGuesses, setPlayerGuesses] = useState([]);  // Player's guess history
  const [aiGuesses, setAiGuesses] = useState([]);         // AI's guess history
  const [currentGuess, setCurrentGuess] = useState("");   // Current player input
  const [gameOver, setGameOver] = useState(false);        // Game completion flag
  const [winner, setWinner] = useState(null);             // Winner identifier
  const [difficulty, setDifficulty] = useState(DIFFICULTY.MEDIUM); // Game difficulty
  const [playerName, setPlayerName] = useState("Player34567");     // Player identifier

  // Initialize game when component mounts or difficulty changes
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  /**
   * Resets all game state and starts a new game
   */
  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    setSecretWord(WORD_LIST[randomIndex]);  // Select random word from dictionary
    setPlayerGuesses([]);                   // Clear player guesses
    setAiGuesses([]);                       // Clear AI guesses
    setCurrentGuess("");                    // Reset current input
    setGameOver(false);                     // Reset game status
    setWinner(null);                        // Clear previous winner
  };

  /**
   * Handles player's guess submission
   * @param {Event} e - Form submission event
   */
  const handlePlayerGuess = (e) => {
    e.preventDefault();
    // Validate input length and game state
    if (currentGuess.length !== 5 || gameOver) return;

    const upperGuess = currentGuess.toUpperCase();

    // Update player's guess history
    const newPlayerGuesses = [...playerGuesses, upperGuess];
    setPlayerGuesses(newPlayerGuesses);

    // Check for immediate win
    if (upperGuess === secretWord) {
      setGameOver(true);
      setWinner("player");
      return;
    }

    // Trigger AI's turn after a short delay (for better UX)
    setTimeout(() => makeAiGuess(newPlayerGuesses), 500);

    // Clear input field for next guess
    setCurrentGuess("");
  };

  /**
   * AI's turn to make a guess based on current game state
   * @param {Array} playerGuesses - Player's guess history
   */
  const makeAiGuess = (playerGuesses) => {
    if (gameOver) return;

    let possibleWords = [...WORD_LIST];  // Start with full dictionary
    let feedbackHistory = [];            // Track feedback from player guesses

    // Process each player guess to narrow down possible words
    for (const guess of playerGuesses) {
      const feedback = getFeedback(guess, secretWord);
      feedbackHistory.push({ guess, feedback });
      possibleWords = filterWords(possibleWords, guess, feedback);
    }

    let aiGuess;
    // Handle edge cases first
    if (possibleWords.length === 0) {
      aiGuess = "ERROR";  // Should theoretically never happen
    } else if (possibleWords.length === 1) {
      aiGuess = possibleWords[0];  // Only one possible word left
    } else {
      // Select guess strategy based on difficulty
      switch (difficulty) {
        case DIFFICULTY.EASY:
          // Random selection from possible words
          aiGuess = possibleWords[Math.floor(Math.random() * possibleWords.length)];
          break;
        case DIFFICULTY.MEDIUM:
          // 70% chance of optimal guess, 30% random
          aiGuess = Math.random() > 0.3
            ? getOptimalGuess(possibleWords)
            : possibleWords[Math.floor(Math.random() * possibleWords.length)];
          break;
        case DIFFICULTY.HARD:
          // Always use optimal strategy
          aiGuess = getOptimalGuess(possibleWords);
          break;
        default:
          aiGuess = possibleWords[0];
      }
    }

    // Update AI's guess history
    const newAiGuesses = [...aiGuesses, aiGuess];
    setAiGuesses(newAiGuesses);

    // Check if AI won
    if (aiGuess === secretWord) {
      setGameOver(true);
      setWinner("ai");
    }
  };

  /**
   * Generates feedback for a guess compared to the secret word
   * @param {string} guess - The guessed word
   * @param {string} secret - The secret word
   * @returns {Array} Feedback array with "correct", "present", or "absent" for each letter
   */
  const getFeedback = (guess, secret) => {
    const feedback = Array(5).fill(null);
    const secretLetters = secret.split("");
    const guessLetters = guess.split("");

    // First pass: mark correct letters (exact position matches)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === secretLetters[i]) {
        feedback[i] = "correct";
        secretLetters[i] = null;  // Mark as used
      }
    }

    // Second pass: mark present letters (correct letter, wrong position)
    for (let i = 0; i < 5; i++) {
      if (feedback[i] === "correct") continue;  // Skip already marked letters

      const indexInSecret = secretLetters.indexOf(guessLetters[i]);
      if (indexInSecret !== -1) {
        feedback[i] = "present";
        secretLetters[indexInSecret] = null;  // Mark as used
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
  const filterWords = (words, guess, feedback) => {
    return words.filter((word) => {
      // Check each candidate word against the feedback rules
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const feedbackCode = feedback[i];

        // Rule 1: Correct position (🟩)
        if (feedbackCode === "correct" && word[i] !== letter) {
          return false;  // Eliminate words without this letter in exact position
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
            (val, idx) => guess[idx] === letter && (val === "correct" || val === "present")
          ).length;

          // Count how many times letter appears in candidate word
          const letterCountInWord = word.split("").filter((l) => l === letter).length;

          // Eliminate words with more copies than feedback suggests
          if (letterCountInWord > presentCount) {
            return false;
          }
        }
      }

      return true;  // Keep word if all checks pass
    });
  };

  /**
   * Selects the most optimal guess using information theory (entropy)
   * @param {Array} possibleWords - List of remaining possible words
   * @returns {string} The optimal guess
   */
  const getOptimalGuess = (possibleWords) => {
    // Return immediately if few options remain
    if (possibleWords.length <= 2) return possibleWords[0];

    let bestGuess = possibleWords[0];
    let bestScore = -1;

    // Limit to first 20 words for performance
    const wordsToCheck = possibleWords.length > 20 
      ? possibleWords.slice(0, 20) 
      : possibleWords;

    // Evaluate each potential guess
    for (const word of wordsToCheck) {
      const feedbackCounts = {};  // Track frequency of each feedback pattern

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
        entropy -= prob * Math.log2(prob);  // Information theory formula
      }

      // Update best guess if this one is better
      if (entropy > bestScore) {
        bestScore = entropy;
        bestGuess = word;
      }
    }

    return bestGuess;
  };

  /**
   * Renders a guess with appropriate feedback coloring
   * @param {string} guess - The word to render
   * @param {boolean} isPlayer - Whether this is a player's guess
   * @returns {JSX} Styled guess component
   */
  const renderGuess = (guess, isPlayer = false) => {
    if (!guess) return null;

    const feedback = getFeedback(guess, secretWord);

    return (
      <div className={`guess-row ${isPlayer ? "player-guess" : "ai-guess"}`}>
        {guess.split("").map((letter, i) => (
          <div key={i} className={`letter-box ${feedback[i]}`}>
            {letter}
          </div>
        ))}
      </div>
    );
  };

  // Render game UI
  return (
    <div className="App">
      <h1>Wordle Challenge</h1>
      
      {/* Game configuration area */}
      <div className="game-info">
        <div>
          <label>Player Name: </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <label>Difficulty: </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={playerGuesses.length > 0}
          >
            <option value={DIFFICULTY.EASY}>Easy</option>
            <option value={DIFFICULTY.MEDIUM}>Medium</option>
            <option value={DIFFICULTY.HARD}>Hard</option>
          </select>
        </div>
        <button onClick={startNewGame}>New Game</button>
      </div>

      {/* Main game area with player and AI sections */}
      <div className="game-container">
        <div className="player-section">
          <h2>{playerName || "Player"}</h2>
          {playerGuesses.map((guess, i) => (
            <div key={i}>{renderGuess(guess, true)}</div>
          ))}
          {!gameOver && playerGuesses.length < 6 && (
            <form onSubmit={handlePlayerGuess} className="player-form">
              <input
                type="text"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                maxLength={5}
                pattern="[A-Za-z]{5}"
                title="5-letter word"
                required
                placeholder="Enter guess"
                inputMode="text"
                autoCapitalize="characters"
                className="mobile-input"
                autoFocus 
              />
              <button type="submit" className="mobile-button">Guess</button>
            </form>
          )}
        </div>

        <div className="ai-section">
          <h2>AI Opponent</h2>
          {aiGuesses.map((guess, i) => (
            <div key={i}>{renderGuess(guess)}</div>
          ))}
        </div>
      </div>

      {/* Game over messages */}
      {gameOver && (
        <div className="game-over">
          <h2>
            {winner === "player"
              ? `🎉 ${playerName || "Player"} Wins!`
              : "🤖 AI Wins!"}
          </h2>
          <p>
            The word was: <strong>{secretWord}</strong>
          </p>
          <button onClick={startNewGame}>Play Again</button>
        </div>
      )}

      {/* Max guesses reached without winning */}
      {playerGuesses.length >= 6 && !gameOver && (
        <div className="game-over">
          <h2>😢 Game Over - No Winner</h2>
          <p>
            The word was: <strong>{secretWord}</strong>
          </p>
          <button onClick={startNewGame}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
