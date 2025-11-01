import { useState } from "react"
import { getFactors, isPrimeOrOne } from "../utils"
import "./../components/big/pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import RestartButton from "../components/small/RestartButton"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"
import { FormattedMessage } from "react-intl"

const KurangkanFaktor2 = () => {
  const [currNumber, setCurrNumber] = useState(120)
  const [turn, setTurn] = useState(0)

  const restart = (e) => {
    e.preventDefault()
    setCurrNumber(120)
    setTurn(0)
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    setCurrNumber(cn => cn - val)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      <div>
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={isPrimeOrOne(currNumber)} />
        <NumberDisplayer currNumber={currNumber}/>
        {!isPrimeOrOne(currNumber) && (<p className="helper-text"><FormattedMessage id="problems.subtractfactorv2.helpertext"/></p>)}
        {getFactors(currNumber).slice(1, -1).map((val) => {
          return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)} />)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem problemId={"subtractfactorv2"} board={board}/>
  )
}

export default KurangkanFaktor2