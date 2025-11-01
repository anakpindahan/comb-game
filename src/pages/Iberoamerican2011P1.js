import { useState } from "react"
import "./../components/big/pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"
import { FormattedMessage } from "react-intl"

const Iberoamerican2011P1 = () => {
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
          <p className="helper-text"><FormattedMessage id="problems.ibero11p1.helpertext"/></p>
            <FactorButton text="2n" handler={(e) => handleSubmit(e, 0)} />
            <FactorButton text="3n" handler={(e) => handleSubmit(e, 1)} />
            <FactorButton text="n+1" handler={(e) => handleSubmit(e, 2)} />
        </div>
      )}
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem problemId={"ibero11p1"} board={board}/>
  )
}

export default Iberoamerican2011P1