import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import RestartButton from "../components/small/RestartButton"

const AddSmaller = () => {
  const title = "Tambahkan yang Lebih Kecil"
  const desc = "This game begins with the number 2. In one turn, a player can add to the current number any natural number smaller than it. The player who reaches the number 1000 wins."
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

  const [turn, setTurn] = useState(0)
  const [currNumber, setCurrNumber] = useState(2)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setCurrNumber(2)
  }

  const getPossibleNumbers = (x) => {
    return Array.from({length: x}, (_, i) => i)
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
            <p className="helper-text">Pilihan bilangan yang ingin ditambahkan</p>
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
    <Problem title={title} desc={desc} source={source} board={board}/>
  )
}

export default AddSmaller