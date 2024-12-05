import { useState } from "react";
import Problem from "../components/big/Problem";
import PlayerTurn from "../components/small/PlayerTurn";
import NumberDisplayer from "../components/small/NumberDisplayer";
import FactorButton from "../components/small/FactorButton";
import RestartButton from "../components/small/RestartButton";

const Lusophon2022P2 = () => {
  const title = "Fruits in a Box"
  const desc = "Anselmo and Claudio are playing alternatively a game with fruits in a box. The box initially has 32 fruits. Anselmo plays first and each turn consists of taking away 1, 2, or 3 fruits from the box or taking away 2/3 of the fruits from the box (this is only possible when the number of the fruits left in the box is a multiple of 3). The player that takes away the last fruit from the box wins. Which of these two players has a winning strategy? How should that player play in order to win?"
  const source = "Lusophon MO 2022 P2"

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
        {currNumber > 0 && (<p className="helper-text">Pilih banyak buah yang ingin diambil</p>)}
        {validSteps().map((val) => {
          return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source}/>
  )
}

export default Lusophon2022P2