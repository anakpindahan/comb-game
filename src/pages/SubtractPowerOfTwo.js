import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"
import { FormattedMessage } from "react-intl"

const SubtractPowerOfTwo = () => {
  const n = 1000
  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(n)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(n)
  }

  const getPossibleNumbers = (x) => {
    if(x > 0){
      const maxExp = Number(x).toString(2).length
      return Array.from({length: maxExp}, (_, i) => 2**i)
    } else {
      return []
    }
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    setCurrNumber(cn => cn - val)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      <div>
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={currNumber === 0}/>
        <NumberDisplayer currNumber={currNumber}/>
        {currNumber > 0 && (<p className="helper-text"><FormattedMessage id="problems.subtractpowerof2.helpertext"/></p>)}
        {getPossibleNumbers(currNumber).map((val) => {
          return(<FactorButton text={val} handler={(e) => handleSubmit(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return (
    <Problem problemId={"subtractpowerof2"} board={board} />
  )
}

export default SubtractPowerOfTwo