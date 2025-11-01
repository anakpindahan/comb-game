import { useState } from "react"
import "./../components/big/pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"
import FirstSelectionButton from "../components/small/FirstSelectionButton"
import { FormattedMessage } from "react-intl"

const KalikanTerus = () => {
  const [currNumber, setCurrNumber] = useState(1)
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [target, setTarget] = useState(999999)

  const isWon = (n) => {
    return n >= target
  }

  const restart = (e) => {
    e.preventDefault()
    setTarget(999999)
    setTurn(0)
    setCurrNumber(1)
    setIsFinished(false)
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isWon(currNumber * val)){
      setIsFinished(true)
    }
    setCurrNumber(cn => cn * val)
    setTurn(t => (t + 1) % 2)
  }

  const handleChangeTarget = (e, t) => {
    e.preventDefault()
    setTarget(t)
  }

  const board = (
    <div>
      {target === 999999 && (
      <div className="first-selection-div">
        <h2 className="helper-text"><FormattedMessage id="problems.keepmultiply.form.text"/></h2>
        {[1000, 1000000].map((val) => {
          return (<FirstSelectionButton val={val} handler={(e) => handleChangeTarget(e, val)}/>)
        })}
      </div>)}
      {target !== 999999 && (
        <div>
          <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={isWon(currNumber)}/>
          <NumberDisplayer currNumber={currNumber}/>
          {!isFinished && (
            <div>
              <p className="helper-text"><FormattedMessage id="problems.keepmultiply.helpertext"/></p>
              {Array.from({length: 8}, (_, i) => (i + 2)).map((val) => {
                return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)} />)
              })}
            </div>
          )}
          <RestartButton restartCallback={(e) => restart(e)}/>
        </div>
      )}
    </div>
  )

  return(
    <Problem problemId={"keepmultiply"} board={board}/>
  )
}

export default KalikanTerus