import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"

const SubtractLessThanHalf = () => {
  const title = "Kurangkan Tak Lebih dari Setengah"
  const desc = "A box contains 300 matches. Players take turns removing no more than half the matches in the box. The player who cannot move loses."
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

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
        {currNumber > 1 && (<p className="helper-text">Pilihan bilangan yang ingin dikurangkan</p>)}
        {getPossibleNumbers(currNumber).map((val) => {
          return (<FactorButton text={val} handler={(e) => submitHandler(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} source={source} board={board}/>
  )
}

export default SubtractLessThanHalf