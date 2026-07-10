import Die from "../Components/Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(() => generateDice())
  const buttonRef = useRef(null)
  console.log(buttonRef)

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

function generateDice() {

console.log("Generating new dice...")

   const newDice = []

   for(let i = 0; i < 10; i++) {
     newDice.push({
      id: nanoid(), 
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
     })
   }

   return newDice
}
// console.log(generateDice())

function generatingNewDices() {
  // setDice(generateDice())
if(!gameWon) {
setDice(prevDice => prevDice.map(die => {
    return die.isHeld ? die : {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }))
}  else {
  setDice(generateDice())
}
  
}

function HoldDice(id) {
  // console.log(id)
setDice(prevDice => prevDice.map(die => {
    return die.id === id ? 
    {...die, isHeld: !die.isHeld} : 
    die
}))
}

const diceNumbers = dice.map((dieObj) => {
    return <Die value={dieObj.value} key={dieObj.id} isHeld={dieObj.isHeld} hold={() => HoldDice(dieObj.id)}/>
  })

  return (
    <>
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">

         {diceNumbers}
        </div>
        <button ref={buttonRef} className="roll-dice" onClick={generatingNewDices}>
         { gameWon ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  )
}

