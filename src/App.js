import React, { useState, useEffect } from "react";
import "./App.css";

const WORD_LIST = [
  "ABOUT",
  "ABOVE",
  "ACTOR",
  "ACUTE",
  "ADEPT",
  "ADMIT",
  "ADOPT",
  "ADORE",
  "ADULT",
  "AFTER",
  "AGILE",
  "AGREE",
  "AISLE",
  "ALBUM",
  "ALERT",
  "ALIEN",
  "ALIKE",
  "ALIVE",
  "ALLOW",
  "ALONG",
  "ALOUD",
  "ALTER",
  "AMBER",
  "AMEND",
  "AMPLE",
  "AMPLY",
  "AMUSE",
  "ANGEL",
  "ANGLE",
  "ANKLE",
  "APPLE",
  "APPLY",
  "APRON",
  "ARROW",
  "ASSET",
  "AVERT",
  "AVOID",
  "BACON",
  "BAKER",
  "BASIC",
  "BASIL",
  "BASIN",
  "BATHE",
  "BEACH",
  "BEARD",
  "BEAST",
  "BEATS",
  "BEGIN",
  "BEGUN",
  "BEING",
  "BELOW",
  "BIRCH",
  "BIRTH",
  "BLACK",
  "BLANK",
  "BLINK",
  "BLOWN",
  "BLUSH",
  "BOARD",
  "BOAST",
  "BONUS",
  "BOOST",
  "BOUND",
  "BOWEL",
  "BRAID",
  "BRAIN",
  "BRAKE",
  "BRAND",
  "BRAVE",
  "BREAD",
  "BREAK",
  "BRIDE",
  "BRIEF",
  "BRING",
  "BRISK",
  "BROKE",
  "BROOM",
  "BROWN",
  "BULKY",
  "BUNCH",
  "BUYER",
  "CABIN",
  "CABLE",
  "CAMEL",
  "CANDY",
  "CATER",
  "CHAIN",
  "CHAIR",
  "CHALK",
  "CHARM",
  "CHART",
  "CHASM",
  "CHEAP",
  "CHIEF",
  "CHINA",
  "CHIPS",
  "CHOKE",
  "CHOPS",
  "CIGAR",
  "CLAIM",
  "CLAMP",
  "CLASP",
  "CLASS",
  "CLEAN",
  "CLEAR",
  "CLIMB",
  "CLOAK",
  "CLONE",
  "CLOSE",
  "CLOTH",
  "CLOUD",
  "CLOVE",
  "CLOWN",
  "COAST",
  "CORAL",
  "COUNT",
  "CRAFT",
  "CRANE",
  "CRANK",
  "CRAWL",
  "CRISP",
  "CROSS",
  "CROWD",
  "CROWN",
  "CRUSH",
  "CRUST",
  "CURVE",
  "DAILY",
  "DAIRY",
  "DANCE",
  "DATUM",
  "DECAY",
  "DECOR",
  "DELAY",
  "DEVIL",
  "DIARY",
  "DINER",
  "DIRTY",
  "DISCO",
  "DIVER",
  "DOUBT",
  "DOUGH",
  "DRAFT",
  "DRAIN",
  "DRAWN",
  "DREAM",
  "DRESS",
  "DRINK",
  "DRIVE",
  "EARLY",
  "EARTH",
  "EIGHT",
  "ELBOW",
  "EMAIL",
  "EMPTY",
  "ENJOY",
  "EQUAL",
  "EQUIP",
  "ETHIC",
  "EXACT",
  "EXIST",
  "EXTRA",
  "FACET",
  "FAIRY",
  "FAITH",
  "FALSE",
  "FANCY",
  "FAULT",
  "FAVOR",
  "FEAST",
  "FETCH",
  "FIBER",
  "FIELD",
  "FINAL",
  "FIRST",
  "FLAIR",
  "FLAKE",
  "FLASK",
  "FLICK",
  "FLOAT",
  "FLOCK",
  "FLOWN",
  "FLUSH",
  "FLUTE",
  "FOCAL",
  "FOCUS",
  "FORCE",
  "FORUM",
  "FOUND",
  "FRAME",
  "FRANK",
  "FRAUD",
  "FRESH",
  "FRONT",
  "FROST",
  "FROZE",
  "FRUIT",
  "FUNGI",
  "FUNNY",
  "GHOST",
  "GIVEN",
  "GLASS",
  "GLAZE",
  "GLOBE",
  "GLORY",
  "GLOVE",
  "GRACE",
  "GRADE",
  "GRAIN",
  "GRAND",
  "GRAPE",
  "GRAPH",
  "GRASP",
  "GRASS",
  "GRAVY",
  "GREAT",
  "GREET",
  "GRILL",
  "GROUP",
  "GROWN",
  "GUARD",
  "GUESS",
  "GUEST",
  "GUIDE",
  "HABIT",
  "HAIRY",
  "HAPPY",
  "HARDY",
  "HASTE",
  "HAUNT",
  "HEART",
  "HEAVY",
  "HEFTY",
  "HONEY",
  "HORSE",
  "HOTEL",
  "HOUSE",
  "HUMAN",
  "HUMID",
  "HUMOR",
  "HUSKY",
  "IDEAL",
  "IMAGE",
  "IMPLY",
  "INCUR",
  "INDEX",
  "INFER",
  "INFRA",
  "INLET",
  "INNER",
  "INPUT",
  "INSET",
  "IVORY",
  "JEANS",
  "JOINT",
  "JUICE",
  "LABOR",
  "LADEN",
  "LAPSE",
  "LARGE",
  "LATEX",
  "LAUGH",
  "LAYER",
  "LEAFY",
  "LEANS",
  "LEARN",
  "LEMON",
  "LIGHT",
  "LINER",
  "LIVER",
  "LIVES",
  "LODGE",
  "LOFTY",
  "LOGIC",
  "LOVER",
  "LOWER",
  "LUCID",
  "LUCKY",
  "LUNCH",
  "LYMPH",
  "MACRO",
  "MAGIC",
  "MAIZE",
  "MAJOR",
  "MAKER",
  "MANGO",
  "MAPLE",
  "MARCH",
  "MATCH",
  "MEDAL",
  "MEDIA",
  "MERCY",
  "MERIT",
  "METAL",
  "MICRO",
  "MIDST",
  "MIGHT",
  "MINOR",
  "MINUS",
  "MIXER",
  "MODEL",
  "MOIST",
  "MONEY",
  "MONTH",
  "MORAL",
  "MOUNT",
  "MOUSE",
  "MOUTH",
  "MOVER",
  "MOVIE",
  "MULTI",
  "MUSIC",
  "NAIVE",
  "NEWLY",
  "NEXUS",
  "NICHE",
  "NIGHT",
  "NINJA",
  "NOBLE",
  "NODAL",
  "NOISE",
  "NOISY",
  "NORTH",
  "NOTCH",
  "NOTED",
  "NOVEL",
  "NURSE",
  "OCEAN",
  "OFTEN",
  "OLIVE",
  "ONSET",
  "OPERA",
  "OPTIC",
  "ORBIT",
  "ORGAN",
  "OTHER",
  "OUGHT",
  "OUNCE",
  "OUTER",
  "OVERT",
  "OWING",
  "OWNED",
  "OWNER",
  "OXIDE",
  "PACED",
  "PAINT",
  "PANIC",
  "PANTS",
  "PARTY",
  "PASTE",
  "PATCH",
  "PATIO",
  "PAUSE",
  "PAVED",
  "PAYER",
  "PEACH",
  "PEARL",
  "PEDAL",
  "PHASE",
  "PHONE",
  "PIANO",
  "PILOT",
  "PINCH",
  "PIVOT",
  "PIZZA",
  "PLACE",
  "PLAIN",
  "PLANE",
  "PLANK",
  "PLANT",
  "PLATE",
  "PLEAD",
  "PLUCK",
  "POINT",
  "POKER",
  "POLAR",
  "PORCH",
  "POUCH",
  "POUND",
  "POWER",
  "PRESS",
  "PRICE",
  "PRIDE",
  "PRIME",
  "PRINT",
  "PRIZE",
  "PRONE",
  "PROUD",
  "PROVE",
  "PUNCH",
  "PUPPY",
  "PURGE",
  "PURSE",
  "QUAIL",
  "QUEEN",
  "QUERY",
  "QUEST",
  "QUICK",
  "QUIET",
  "QUILT",
  "QUITE",
  "QUOTA",
  "QUOTE",
  "RADIO",
  "RAINY",
  "RAISE",
  "RANCH",
  "RANGE",
  "RAPID",
  "RATIO",
  "REACH",
  "REACT",
  "READY",
  "REALM",
  "REGAL",
  "REIGN",
  "RELAX",
  "RELAY",
  "RELIC",
  "REMIT",
  "REPAY",
  "REPLY",
  "RESIN",
  "RIDGE",
  "RIGHT",
  "RINSE",
  "RISKY",
  "RIVAL",
  "ROAST",
  "ROCKY",
  "ROMAN",
  "ROUGH",
  "ROUND",
  "ROYAL",
  "RUSTY",
  "SADLY",
  "SAINT",
  "SALON",
  "SALTY",
  "SANDY",
  "SATIN",
  "SAUCE",
  "SCALE",
  "SCARE",
  "SCARF",
  "SCARY",
  "SCENT",
  "SCORE",
  "SCOUT",
  "SCREW",
  "SERUM",
  "SETUP",
  "SHADE",
  "SHADY",
  "SHAKE",
  "SHAKY",
  "SHAME",
  "SHAPE",
  "SHARE",
  "SHARK",
  "SHARP",
  "SHAVE",
  "SHEAR",
  "SHELF",
  "SHELL",
  "SHIFT",
  "SHINE",
  "SHIRT",
  "SHOCK",
  "SHORE",
  "SHORT",
  "SHOUT",
  "SHOVE",
  "SHOWN",
  "SHRUB",
  "SHRUG",
  "SIGHT",
  "SIGMA",
  "SILKY",
  "SINCE",
  "SIXTY",
  "SKATE",
  "SKILL",
  "SKIRT",
  "SLACK",
  "SLATE",
  "SLEEP",
  "SLEPT",
  "SLICE",
  "SLICK",
  "SLIDE",
  "SLING",
  "SLUMP",
  "SMALL",
  "SMART",
  "SMILE",
  "SMOKE",
  "SMOKY",
  "SNACK",
  "SNAIL",
  "SNAKE",
  "SNEAK",
  "SOBER",
  "SOLAR",
  "SOLVE",
  "SOUND",
  "SOUTH",
  "SPACE",
  "SPADE",
  "SPARE",
  "SPARK",
  "SPEAK",
  "SPEAR",
  "SPELL",
  "SPICE",
  "SPICY",
  "SPIKE",
  "SPILL",
  "SPINE",
  "SPLIT",
  "SPOIL",
  "SPOKE",
  "SPORT",
  "SPRAY",
  "SQUAD",
  "SQUAT",
  "SQUID",
  "STACK",
  "STAFF",
  "STAGE",
  "STAIN",
  "STAIR",
  "STAKE",
  "STALE",
  "STAMP",
  "STAND",
  "STARE",
  "STEAD",
  "STEAK",
  "STEAL",
  "STEAM",
  "STEEL",
  "STERN",
  "STICK",
  "STILL",
  "STING",
  "STOCK",
  "STONE",
  "STORE",
  "STORM",
  "STORY",
  "STOVE",
  "STRAP",
  "STRAW",
  "STRAY",
  "STUCK",
  "STUDY",
  "STUFF",
  "STUMP",
  "STYLE",
  "SUGAR",
  "SUITE",
  "SUNNY",
  "SUPER",
  "SWAMP",
  "SWEAT",
  "SWEPT",
  "SWIFT",
  "SWINE",
  "SWING",
  "SWIRL",
  "SYRUP",
  "TABLE",
  "TAKEN",
  "TEACH",
  "TEMPO",
  "THANK",
  "THEIR",
  "THICK",
  "THING",
  "THINK",
  "THIRD",
  "THORN",
  "THOSE",
  "THREE",
  "THROW",
  "THUMB",
  "THYME",
  "TIDAL",
  "TIGER",
  "TIMER",
  "TODAY",
  "TOKEN",
  "TONIC",
  "TOUCH",
  "TOUGH",
  "TOWEL",
  "TOWER",
  "TOXIC",
  "TOXIN",
  "TRACE",
  "TRACK",
  "TRADE",
  "TRAIL",
  "TRAIN",
  "TRASH",
  "TREAD",
  "TREND",
  "TRIAD",
  "TRIAL",
  "TRIBE",
  "TRICK",
  "TWICE",
  "TWINS",
  "ULCER",
  "ULTRA",
  "UNCLE",
  "UNDER",
  "UNIFY",
  "UNITE",
  "UNITY",
  "UPSET",
  "URBAN",
  "USAGE",
  "VAGUE",
  "VALID",
  "VALUE",
  "VIDEO",
  "VIRAL",
  "VITAL",
  "VOCAL",
  "VODKA",
  "VOICE",
  "VOWEL",
  "WAFER",
  "WAGED",
  "WAGER",
  "WAGON",
  "WAIST",
  "WAIVE",
  "WASTE",
  "WATCH",
  "WATER",
  "WEARY",
  "WEIGH",
  "WEIRD",
  "WHALE",
  "WHARF",
  "WHEAT",
  "WHILE",
  "WHITE",
  "WHOLE",
  "WHOSE",
  "WIDEN",
  "WIDTH",
  "WINDY",
  "WOMAN",
  "WOMEN",
  "WORLD",
  "WORSE",
  "WORST",
  "WORTH",
  "WOULD",
  "WOUND",
  "WOVEN",
  "WRECK",
  "WRITE",
  "WRONG",
  "YEAST",
  "YIELD",
  "YOUNG",
  "YOUTH",
];

const DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [playerGuesses, setPlayerGuesses] = useState([]);
  const [aiGuesses, setAiGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.MEDIUM);
  const [playerName, setPlayerName] = useState("Player34567");

  // Initialize the game
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    setSecretWord(WORD_LIST[randomIndex]);
    setPlayerGuesses([]);
    setAiGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWinner(null);
  };

  const handlePlayerGuess = (e) => {
    e.preventDefault();
    if (currentGuess.length !== 5 || gameOver) return;

    const upperGuess = currentGuess.toUpperCase();

    // Player can enter any 5-letter word

    // Add player guess
    const newPlayerGuesses = [...playerGuesses, upperGuess];
    setPlayerGuesses(newPlayerGuesses);

    // Check if player won
    if (upperGuess === secretWord) {
      setGameOver(true);
      setWinner("player");
      return;
    }

    // AI's turn
    setTimeout(() => makeAiGuess(newPlayerGuesses), 500);

    setCurrentGuess("");
  };

  //Making AI guess function
  const makeAiGuess = (playerGuesses) => {
    if (gameOver) return;

    let possibleWords = [...WORD_LIST]; // AI still uses the word list
    let feedbackHistory = [];

    // Process feedback from player's guesses
    for (const guess of playerGuesses) {
      const feedback = getFeedback(guess, secretWord);
      feedbackHistory.push({ guess, feedback });
      possibleWords = filterWords(possibleWords, guess, feedback);
    }

    let aiGuess;
    if (possibleWords.length === 0) {
      aiGuess = "ERROR";
    } else if (possibleWords.length === 1) {
      aiGuess = possibleWords[0];
    } else {
      switch (difficulty) {
        case DIFFICULTY.EASY:
          aiGuess =
            possibleWords[Math.floor(Math.random() * possibleWords.length)];
          break;
        case DIFFICULTY.MEDIUM:
          aiGuess =
            Math.random() > 0.3
              ? getOptimalGuess(possibleWords)
              : possibleWords[Math.floor(Math.random() * possibleWords.length)];
          break;
        case DIFFICULTY.HARD:
          aiGuess = getOptimalGuess(possibleWords);
          break;
        default:
          aiGuess = possibleWords[0];
      }
    }

    const newAiGuesses = [...aiGuesses, aiGuess];
    setAiGuesses(newAiGuesses);

    if (aiGuess === secretWord) {
      setGameOver(true);
      setWinner("ai");
    }
  };

  const getFeedback = (guess, secret) => {
    const feedback = Array(5).fill(null);
    const secretLetters = secret.split("");
    const guessLetters = guess.split("");

    // First mark correct letters
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === secretLetters[i]) {
        feedback[i] = "correct";
        secretLetters[i] = null;
      }
    }

    // Then mark present letters
    for (let i = 0; i < 5; i++) {
      if (feedback[i] === "correct") continue;

      const indexInSecret = secretLetters.indexOf(guessLetters[i]);
      if (indexInSecret !== -1) {
        feedback[i] = "present";
        secretLetters[indexInSecret] = null;
      } else {
        feedback[i] = "absent";
      }
    }

    return feedback;
    //["present", "present", "correct", "present", "absent"] for example
  };



  //function to filter words
  const filterWords = (words, guess, feedback) => {
    // Filters a list of words based on Wordle feedback
    // Example: words=["CRANE","GRAPE","PLATE"], guess="CRANE", feedback=["present","absent","present","absent","correct"]
    
    return words.filter((word) => {
      // Check each candidate word against the feedback rules
      // Example: word = "GRAPE"
      
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];      // Current letter in guessed word
        const feedbackCode = feedback[i]; // Feedback for this position
        // Example (i=0): letter="C", feedbackCode="present"
  
        // Rule 1: Correct position (🟩)
        if (feedbackCode === "correct" && word[i] !== letter) {
          // Word must have this letter in exact position
          // Example: If feedback says "A" is correct in position 2,
          // but word[2] is "B" → eliminate word
          return false;
        }
  
        // Rule 2: Present but wrong position (🟨)
        if (feedbackCode === "present") {
          // Letter must exist in word BUT not in this position
          // Example: "C" is 🟨 in position 0 → word must contain "C" somewhere else
          if (!word.includes(letter) || word[i] === letter) {
            // Case 1: Word doesn't contain the letter at all → eliminate
            // Case 2: Letter is in the same position → eliminate
            return false;
          }
        }
  
        // Rule 3: Absent (⬛)
        if (feedbackCode === "absent") {
          // Count how many times this letter was marked 🟩/🟨 in feedback
          const presentCount = feedback.filter(
            (val, idx) => guess[idx] === letter && 
            (val === "correct" || val === "present")
          ).length;
          // Example: If guess has two "P"s marked 🟨 and 🟩 → presentCount=2
  
          // Count how many times letter appears in candidate word
          const letterCountInWord = word.split("").filter((l) => l === letter).length;
          // Example: word="APPLE" → "P" appears 2 times
  
          // If word has more copies than feedback suggests, eliminate
          if (letterCountInWord > presentCount) {
            // Example: presentCount=1 (one 🟨 "P"), but word has 2 "P"s → eliminate
            return false;
          }
        }
      }
      
      // If all checks passed, keep this word
      return true;
    });
  };




  //On hard mode uses
   const getOptimalGuess = (possibleWords) => {
    // If only 1-2 words left, return first one immediately
    // Example: possibleWords = ["apple", "grape"] → returns "apple"
    if (possibleWords.length <= 2) return possibleWords[0];

    // Initialize tracking variables
    let bestGuess = possibleWords[0]; // Example: "crane"
    let bestScore = -1; // Starting with lowest possible score

    // Limit to first 20 words for performance
    // Example: If possibleWords has 30 words → only checks first 20
    const wordsToCheck =
      possibleWords.length > 20 ? possibleWords.slice(0, 20) : possibleWords;

    // Evaluate each potential guess
    for (const word of wordsToCheck) {
      // Example: word = "crane"
      const feedbackCounts = {}; // Will store patterns like: { "[correct,absent,...]": 3 }

      // Test this guess against all possible secret words
      for (const possibleSecret of possibleWords) {
        // Example: possibleSecret = "grape"
        const feedback = getFeedback(word, possibleSecret);
        // Example feedback: ["present", "absent", "present", "absent", "correct"]

        // Convert feedback array to string key for counting
        const key = JSON.stringify(feedback);
        // Example key: '["present","absent","present","absent","correct"]'

        // Count occurrences of this feedback pattern
        feedbackCounts[key] = (feedbackCounts[key] || 0) + 1;
        // Example: feedbackCounts = { '["present",...]': 1 } (first occurrence)
      }

      // Calculate information value (entropy) of this guess
      let entropy = 0;
      for (const key in feedbackCounts) {
        // Example: key = '["present","absent",...]' appears 4 times out of 20
        const prob = feedbackCounts[key] / possibleWords.length;
        // Example: prob = 4/20 = 0.2

        entropy -= prob * Math.log2(prob);
        //-(0.2 * -2.3219) ≈ -(-0.4644)
        //Negate it: -(-0.4644) = +0.4644
        // Example: Adds ~0.464 to entropy for this pattern
      }
      // Example final entropy for "crane": 1.5219

      // Check if this is the best guess so far
      if (entropy > bestScore) {
        bestScore = entropy;
        bestGuess = word;
        // Example: Updates bestGuess to "crane" if its entropy > previous best
      }
    }

    // Return the most informative guess found
    // Example return: "crane"
    return bestGuess;
  };
 

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

//JSX

return (
  <div className="App">
    <h1>Wordle Challenge</h1>
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

    <div className="game-container">
      <div className="player-section">
        <h2>{playerName || "Player"}</h2>
        {playerGuesses.map((guess, i) => (
          <div key={i}>{renderGuess(guess, true)}</div>
        ))}
        {!gameOver && playerGuesses.length < 6 && (
          <form onSubmit={handlePlayerGuess}>
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
              maxLength={5}
              pattern="[A-Za-z]{5}"
              title="5-letter word"
              required
              placeholder="Enter guess"
            />
            <button type="submit">Guess</button>
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

    {gameOver && (
      <div className="game-over">
        <h2>{winner === "player" ? `🎉 ${playerName || "Player"} Wins!` : "🤖 AI Wins!"}</h2>
        <p>The word was: <strong>{secretWord}</strong></p>
        <button onClick={startNewGame}>Play Again</button>
      </div>
    )}

    {playerGuesses.length >= 6 && !gameOver && (
      <div className="game-over">
        <h2>😢 Game Over - No Winner</h2>
        <p>The word was: <strong>{secretWord}</strong></p>
        <button onClick={startNewGame}>Try Again</button>
      </div>
    )}
  </div>
);
}

export default App;
