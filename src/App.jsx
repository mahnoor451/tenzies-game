import Die from "../Components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateDice());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
 const [timeElapsed, setTimeElapsed] = useState(0)

  const buttonRef = useRef(null);
  // console.log(buttonRef);

  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value,
  );

  // useEffect(() => {
  //   if (gameWon) {
  //     buttonRef.current.focus();
  //   }
  // }, [gameWon]);

  function generateDice() {
    console.log("Generating new dice...");

    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
      });
    }

    return newDice;
  }
  // console.log(generateDice())

  function generatingNewDices() {
    // setDice(generateDice())
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : {
                id: nanoid(),
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
              };
        }),
      );

      if(!isTimerRunning && timeElapsed === 0) {
        setIsTimerRunning(true)
      }
    } else {
      setDice(generateDice());
      setTimeElapsed(0)
      setIsTimerRunning(true)
    }
  }

  function HoldDice(id) {
    // console.log(id)
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  const diceNumbers = dice.map((dieObj) => {
    return (
      <Die
        value={dieObj.value}
        key={dieObj.id}
        isHeld={dieObj.isHeld}
        hold={() => HoldDice(dieObj.id)}
      />
    );
  });

  useEffect(() => {
  let intervalId;

  if (isTimerRunning) {
    intervalId = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);
  }

  return () => clearInterval(intervalId); // Destroys the current timer instantly before making a new one
}, [isTimerRunning]);

// Auto-stop the stopwatch when the player wins
useEffect(() => {
  if (gameWon) {
    setIsTimerRunning(false)
    if (buttonRef.current) buttonRef.current.focus()
  }
}, [gameWon])



  {/* Calculate values on the fly */}
const minutes = String(Math.floor(timeElapsed / 60)).padStart(2, "0");
const seconds = String(timeElapsed % 60).padStart(2, "0");

return (
  <main>
    {gameWon && <Confetti />}
    
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same...</p>

    {/* 🏆 Dynamic Win Message */}
    {gameWon && !isTimerRunning && (
      <p className="win-message">
        You won! You spent {minutes} minutes and {seconds} seconds.
      </p>
    )}

    <div className="container">
      {diceNumbers}
    </div>

    <button ref={buttonRef} className="roll-dice" onClick={generatingNewDices}>
      {gameWon ? "New Game" : "Roll Dice"}
    </button>

    {/* ⏱️ Digital Stopwatch Layout */}
    <div className="timer-container">
      <p className="minute pseudo">{minutes}</p>
      <span className="colon">:</span>
      <p className="second">{seconds}</p>
    </div>
  </main>
)
}

