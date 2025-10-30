import { useState } from "react"
import { getFactors } from "../utils"
import "./pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import RestartButton from "../components/small/RestartButton"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"

const TambahkanProperDivisor = () => {
  const title = "Tambahkan Proper Divisor"
  const desc = "Start with n = 2. Two players A and B move alternately by adding a proper divisor of n to the current n. The goal is a number ≥ 1990. Who wins?"
  const source = "Problem-Solving Strategies - Arthur Engel"

  const [currNumber, setCurrNumber] = useState(2)
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const restart = (e) => {
    e.preventDefault()
    setCurrNumber(2)
    setTurn(0)
    setIsFinished(false)
  }

  const isWon = (n) => {
    return n >= 1990
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isWon(currNumber + val)){
      setIsFinished(true)
    }
    setCurrNumber(cn => cn + val)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <>
      <div>
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={isWon(currNumber)} />
        <NumberDisplayer currNumber={currNumber}/>
        {!isFinished && (<p className="helper-text">Pilihan faktor yang ingin ditambahkan:</p>)}
        {!isFinished && getFactors(currNumber).slice(0, -1).map((val) => {
          return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)} />)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source}/>
  )
}

export default TambahkanProperDivisor