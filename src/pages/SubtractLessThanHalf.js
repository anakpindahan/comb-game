import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"
import { FormattedMessage } from "react-intl"

const SubtractLessThanHalf = () => {
  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(300)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(300)
  }

  const getPossibleNumbers = (x) => {
    return Array.from({length: x/2}, (_, i) => i + 1)
  }

  const submitHandler = (e, val) => {
    e.preventDefault()
    setCurrNumber(cn => cn - val)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      <div>
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={currNumber === 1} />
        <NumberDisplayer currNumber={currNumber}/>
        {currNumber > 1 && (<p className="helper-text"><FormattedMessage id="problems.subtractlessthanhalf.helpertext"/></p>)}
        {getPossibleNumbers(currNumber).map((val) => {
          return (<FactorButton text={val} handler={(e) => submitHandler(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem problemId={"subtractlessthanhalf"} board={board}/>
  )
}

export default SubtractLessThanHalf