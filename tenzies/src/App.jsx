import { useState, useEffect} from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
const [dice, setDice] = useState(generateDie);
const [tanzie, setTanzie] = useState(false);


console.log(tanzie)

useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld);
  const firstValue = dice[0].value;
  const allSameValue = dice.every(die => die.value === firstValue);
  if(allHeld && allSameValue){
    setTanzie(true)
  }
},[dice])

const displayDice = dice.map(die => 
<Die 
value={die.value}
key={die.id}
holdDie={holdDie}
id={die.id}
isHeld={die.isHeld}
/>)

function generateDie(){
  const newDice = [];
  for(let i = 0; i < 10; i++){
    newDice.push({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    })
  }
  return newDice
}

function roll(){
  setDice(oldDie => oldDie.map(die => {
    return die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1}
  }))
  if(tanzie){
    setDice(generateDie)
    setTanzie(false)
  }
}

function holdDie(id){
  setDice(oldDie => oldDie.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
}


  return (
    <main>
      {tanzie && <Confetti  />}
      {tanzie && <h1>You Won</h1>}
      <h1>Tenzie Game</h1>
      <div className='dice-container'>
        {displayDice}
      </div>
      <button className='rollBtn' onClick={roll}>{tanzie ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
