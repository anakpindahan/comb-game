import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"

const SubtractPowerOfTwo = () => {
  const title = "Kurangkan Dua Berpangkat"
  const desc = "This game begins with the number 1000. In one turn, a player can subtract from the current number any natural number less than it which is a power of 2 (note that 1 = 2°). The player who reaches the number 0 wins."
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

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
        {currNumber > 0 && (<p className="helper-text">Pilihan bilangan yang ingin dikurangkan:</p>)}
        {getPossibleNumbers(currNumber).map((val) => {
          return(<FactorButton text={val} handler={(e) => handleSubmit(e, val)}/>)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return (
    <Problem title={title} desc={desc} source={source} board={board} />
  )
}

export default SubtractPowerOfTwo