import React from 'react';
import PropTypes from 'prop-types';
import { getFeedback } from '../logic/gameLogic';


/**
 * GuessRow - Displays a single guess with color-coded feedback
 * @param {Object} props - Component props
 * @param {string} props.guess - The word being rendered
 * @param {boolean} [props.isPlayer=false] - Whether this is a player's guess
 * @param {string} props.secretWord - The target word for feedback calculation
 * @returns {JSX.Element} Styled guess row component
 */
const GuessRow = ({ guess, isPlayer = false, secretWord }) => {
  if (!guess) return null;

  // Calculate feedback for each letter position
  const feedback = getFeedback(guess, secretWord);

  return (
    <div className={`guess-row ${isPlayer ? 'player-guess' : 'ai-guess'}`}>
      {guess.split('').map((letter, i) => (
        <div key={`${letter}-${i}`} className={`letter-box ${feedback[i]}`}>
          {letter}
        </div>
      ))}
    </div>
  );
};

GuessRow.propTypes = {
  guess: PropTypes.string.isRequired,
  isPlayer: PropTypes.bool,
  secretWord: PropTypes.string.isRequired
};

export default GuessRow;