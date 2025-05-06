/**
 * Wordle Challenge Game - Player vs AI
 * A React implementation of the Wordle game where players compete against an AI opponent
 * Features:
 * - Multiple difficulty levels for AI
 * - Interactive gameplay with feedback
 * - Responsive design
 */

import React, { useState, useEffect } from "react";
import "./styles/App.css";
import WordList from "./utils/wordList";
import { DIFFICULTY, MAX_ATTEMPTS, WORD_LENGTH } from "./constants/constants";
// import { getFeedback } from "./logic/gameLogic";
import { makeAiGuess } from "./logic/aiLogic";
import GuessRow from "./components/guessRow";
import GameControl from "./components/gameControls";
 
function App() {
  // Game state management using a single state object for related data
  const [gameState, setGameState] = useState({
    secretWord: "", // The target word to be guessed
    playerGuesses: [], // Array of player's attempted guesses
    aiGuesses: [], // Array of AI's attempted guesses
    currentGuess: "", // Player's current input
    gameOver: false, // Flag indicating if game has concluded
    winner: null, // 'player' or 'ai' when game ends
    difficulty: DIFFICULTY.MEDIUM, // Current game difficulty
    playerName: "Player", // Player's display name
  });

  // Load the word list for the game
  const WORD_LIST = WordList();

  // Initialize new game when component mounts or difficulty changes
  useEffect(() => {
    startNewGame();
  }, [gameState.difficulty]);

  /**
   * Resets game state and starts a new round
   * - Selects a new random secret word
   * - Clears all guesses and game status
   */
  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    setGameState({
      ...gameState,
      secretWord: WORD_LIST[randomIndex],
      playerGuesses: [],
      aiGuesses: [],
      currentGuess: "",
      gameOver: false,
      winner: null,
    });
  };

  /**
   * Handles player's guess submission
   * @param {Event} e - Form submission event
   */
  const handlePlayerGuess = (e) => {
    e.preventDefault();
    const { currentGuess, gameOver, playerGuesses, secretWord } = gameState;

    // Validate input length and game state
    if (currentGuess.length !== WORD_LENGTH || gameOver) return;

    const upperGuess = currentGuess.toUpperCase();
    const newPlayerGuesses = [...playerGuesses, upperGuess];

    // Update state with new guess and clear input
    setGameState({
      ...gameState,
      playerGuesses: newPlayerGuesses,
      currentGuess: "",
    });

    // Check for immediate win
    if (upperGuess === secretWord) {
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        winner: "player",
      }));
      return;
    }

    // Trigger AI's turn after a short delay (500ms for better UX)
    setTimeout(() => {
      const aiGuess = makeAiGuess(
        newPlayerGuesses,
        secretWord,
        gameState.difficulty,
        WORD_LIST
      );
      const newAiGuesses = [...gameState.aiGuesses, aiGuess];

      // Update state with AI's guess and check for AI win
      setGameState((prev) => ({
        ...prev,
        aiGuesses: newAiGuesses,
        gameOver: aiGuess === secretWord,
        winner: aiGuess === secretWord ? "ai" : null,
      }));
    }, 500);
  };

  // // Event handlers for form inputs
  const handleInputChange = (e) => {
    setGameState({
      ...gameState,
      currentGuess: e.target.value.toUpperCase(), // Store uppercase version
    });
  };

  const handleDifficultyChange = (e) => {
    setGameState({
      ...gameState,
      difficulty: e.target.value,
    });
  };

  const handleNameChange = (e) => {
    setGameState({
      ...gameState,
      playerName: e.target.value,
    });
  };

  // Destructure state for cleaner JSX
  const {
    playerName,
    difficulty,
    currentGuess,
    playerGuesses,
    aiGuesses,
    gameOver,
    winner,
    secretWord,
  } = gameState;

  return (
    <div className="App">
      <h1>Wordle Challenge</h1>

      <GameControl
        playerName={playerName}
        difficulty={difficulty}
        difficultyLevels={DIFFICULTY} // Your difficulty constants
        playerGuesses={playerGuesses}
        onNameChange={handleNameChange}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={startNewGame}
      />

      {/* Main game area */}
      <div className="game-container">
        {/* Player section */}
        <div className="player-section">
          <h2>{playerName || "Player"}</h2>
          {/* Display player's guess history */}
          {playerGuesses.map((guess, i) => (
            <GuessRow
              key={`player-${i}`}
              guess={guess}
              isPlayer={true}
              secretWord={secretWord}
            />
          ))}

          {/* Show input form if game is active and attempts remain */}
          {!gameOver && playerGuesses.length < MAX_ATTEMPTS && (
            <form onSubmit={handlePlayerGuess} className="player-form">
              <input
                type="text"
                value={currentGuess}
                onChange={handleInputChange}
                maxLength={WORD_LENGTH}
                pattern="[A-Za-z]{5}"
                title="5-letter word"
                required
                placeholder="Enter guess"
                inputMode="text"
                autoCapitalize="characters"
                className="mobile-input"
                autoFocus
              />
              <button type="submit" className="mobile-button">
                Guess
              </button>
            </form>
          )}
        </div>

        {/* AI opponent section */}
        <div className="ai-section">
          <h2>AI Opponent</h2>
          {/* Display AI's guess history */}
          {aiGuesses.map((guess, i) => (
            <GuessRow
              key={`ai-${i}`}
              guess={guess}
              isPlayer={false}
              secretWord={secretWord}
            />
          ))}
        </div>
      </div>

      {/* Game over messages */}
      {gameOver ? (
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
      ) : (
        playerGuesses.length >= MAX_ATTEMPTS && (
          <div className="game-over">
            <h2>😢 Game Over - No Winner</h2>
            <p>
              The word was: <strong>{secretWord}</strong>
            </p>
            <button onClick={startNewGame}>Try Again</button>
          </div>
        )
      )}
    </div>
  );
}

export default App;
