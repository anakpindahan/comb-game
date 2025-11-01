import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"
import { FormattedMessage } from "react-intl"

const AddSmaller = () => {
  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(2)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(2)
  }

  const getPossibleNumbers = (x) => {
    return Array.from({length: x - 1}, (_, i) => (i + 1))
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    setCurrNumber(cn => cn + val)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      <div>
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={currNumber >= 1000}/>
        <NumberDisplayer currNumber={currNumber} />
        {currNumber < 1000 && (
          <div>
            <p className="helper-text"><FormattedMessage id="problems.addsmaller.helpertext"/></p>
            {getPossibleNumbers(currNumber).map((val) => {
              return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)}/>)
            })}
          </div>
        )}
      </div>
      <RestartButton restartCallback={(e) => restart(e)} />
    </div>
  )
  
  return (
    <Problem problemId={"addsmaller"} board={board}/>
  )
}

export default AddSmaller