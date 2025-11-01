import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import InputNForm from "../components/small/InputNForm"
import RestartButton from "../components/small/RestartButton"
import { FormattedMessage } from "react-intl"

const Bachet = () => {
  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(-1)
  const [expN, setExpN] = useState(1)

  const restart = (e) => {
    e.preventDefault()
    setCurrNumber(-1)
    setTurn(0)
    setExpN(1)
  }

  const validSteps = () => {
    if(currNumber > 3){
      return [1, 2, 3]
    } else if(currNumber > 0){
      return Array.from({length: currNumber}, (_, i) => i + 1)
    } else {
      return []
    }
  }

  const handleChangeN = (e) => {
    e.preventDefault()
    setCurrNumber(expN)
  }

  const handleSubtractor = (e, v) => {
    e.preventDefault()
    setCurrNumber(cn => cn - v)
    setTurn(t => (t + 1) % 2)
  }

  const board = (
    <div>
      {currNumber !== -1 ? (
        <div>
          <div>
            <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={currNumber === 0}/>
            <NumberDisplayer currNumber={currNumber}/>
            {currNumber > 0 && (<p className="helper-text"><FormattedMessage id="problems.bachet.helpertext"/></p>)}
            {validSteps().map((val) => {
              return (<FactorButton text={val} handler={(e) => handleSubtractor(e, val)}/>)
            })}
          </div>
          <RestartButton restartCallback={(e) => restart(e)}/>
        </div>  
      ) : (
        <div>
          <InputNForm text={<FormattedMessage id="problems.bachet.form.text"/>}
            submitHandler={(e) => handleChangeN(e)}
            changeHandler={(e) => setExpN(e.target.value)}
            val={expN}
            min={"1"}
            max={"120"}
          />
        </div>
      )}
    </div>
  )

  return(
    <Problem problemId={"bachet"} board={board} />
  )
}

export default Bachet