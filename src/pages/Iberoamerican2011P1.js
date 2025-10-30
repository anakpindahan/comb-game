import { useState } from "react"
import "./pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"

const Iberoamerican2011P1 = () => {
  const title = "2n, 3n, n+1"
  const desc = "Bilangan 2 tertulis di papan. Ana dan Bruno bermain sebuah permainan. Dimulai dari Ana, secara bergantian, pemain dapat mengganti bilangan n yang ada di papan menjadi 2n, 3n, atau n + 1. Pemain pertama yang mendapatkan bilangan yang lebih besar atau sama dengan 2011 menang. Tentukan siapa yang memiliki strategi menang."
  const source = "Iberoamerican 2011 P1"

  const [currNumber, setCurrNumber] = useState(2)
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const isWon = (n) => {
    return n >= 2011
  }

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(2)
    setIsFinished(false)
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    let newNumber = currNumber
    if(val === 0){
      newNumber *= 2
    } else if(val === 1){
      newNumber *= 3
    } else if(val === 2){
      newNumber += 1
    }
    if(isWon(newNumber)){
      setIsFinished(true)
    }
    setCurrNumber(newNumber)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={isWon(currNumber)}/>
      <NumberDisplayer currNumber={currNumber}/>
      {!isFinished && (
        <div>
          <p className="helper-text">Pilihan hal yang ingin dilakukan:</p>
            <FactorButton text="2n" handler={(e) => handleSubmit(e, 0)} />
            <FactorButton text="3n" handler={(e) => handleSubmit(e, 1)} />
            <FactorButton text="n+1" handler={(e) => handleSubmit(e, 2)} />
        </div>
      )}
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source}/>
  )
}

export default Iberoamerican2011P1