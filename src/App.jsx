import Die from "../Components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(generateDice)

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

function generateDice() {
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
  setDice(prevDice => prevDice.map(die => {
    return die.isHeld ? die : {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }))
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
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">

         {diceNumbers}
        </div>
        <button className="roll-dice" onClick={generatingNewDices}>
         { gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

