import { useState } from "react";
import Problem from "../components/big/Problem";
import PlayerTurn from "../components/small/PlayerTurn";
import NumberDisplayer from "../components/small/NumberDisplayer";
import FactorButton from "../components/small/FactorButton";
import RestartButton from "../components/small/RestartButton";
import { FormattedMessage } from "react-intl";

const Lusophon2022P2 = () => {
  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(32)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(32)
  }

  const validSteps = () => {
    let steps = []
    if(currNumber > 3){
      steps.push(1, 2, 3)
      if(currNumber % 3 === 0){
        steps.push(currNumber*2/3)
      }
    } else {
      steps.push(...Array.from({length: currNumber}, (_, i) => i + 1))
    }
    return steps
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
        {currNumber > 0 && (<p className="helper-text"><FormattedMessage id="problems.lusophon22p2.helpertext"/></p>)}
        {validSteps().map((val) => {
          return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem problemId={"lusophon22p2"} board={board} />
  )
}

export default Lusophon2022P2