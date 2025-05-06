import React from 'react';

//game control inputs JSX
const GameControl = ({
  playerName,
  difficulty,
  difficultyLevels,
  playerGuesses,
  onNameChange,
  onDifficultyChange,
  onNewGame
}) => {
  return (
    <div className="game-control-container">
      <div className="control-group">
        <label className="control-label">Player:</label>
        <input
          className="control-input"
          type="text"
          value={playerName}
          onChange={onNameChange}
          placeholder="Your name"
        />
      </div>

      <div className="control-group">
        <label className="control-label">Difficulty:</label>
        <select
          className="control-select"
          value={difficulty}
          onChange={onDifficultyChange}
          disabled={playerGuesses.length > 0}
        >
          <option value={difficultyLevels.EASY}>Easy</option>
          <option value={difficultyLevels.MEDIUM}>Medium</option>
          <option value={difficultyLevels.HARD}>Hard</option>
        </select>
      </div>

      <button className="control-button" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
};

export default GameControl;