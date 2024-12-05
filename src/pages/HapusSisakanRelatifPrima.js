import { useState } from "react"
import { gcd } from "../utils"
import "./pages.css"
import "./kurangkanfaktor.css"
import Problem from "../components/big/Problem"
import FactorButton from "../components/small/FactorButton"
import PlayerTurn from "../components/small/PlayerTurn"
import RestartButton from "../components/small/RestartButton"
import InputNForm from "../components/small/InputNForm"

const HapusSisakanRelatifPrima = () => {
  const title = "Hapus Sisakan Relatif Prima"
  const desc = "Start with n ≥ 12 successive positive integers. A and B alternately take one integer, until only two integers a and b are left. A wins if gcd(a, b) = 1, and B wins if gcd(a, b) > 1. Who wins?"
  const source = "Problem-Solving Strategies - Arthur Engel"

  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [n, setN] = useState(-1)
  const [expN, setExpN] = useState(12)
  const [numberList, setNumberList] = useState([])

  const restart = (e) => {
    e.preventDefault()
    setN(-1)
    setExpN(12)
    setNumberList([])
    setTurn(0)
    setIsFinished(false)
  }

  const playerWon = () => {
    return gcd(numberList[0], numberList[1]) === 1 ? 1 : 2
  }

  const handleChangeN = (e) => {
    e.preventDefault()    
    setN(expN)
    setNumberList(Array.from({length: expN}, (_, i) => (i + 1)))
  }

  const handleXRemoval = (e, x) => {
    e.preventDefault()
    setTurn(t => ((t + 1) % 2))
    if(numberList.length === 3){
      setIsFinished(true)
    }
    setNumberList(numberList.filter(item => item !== x))
  }

  const board = (
    <div>
      {n === -1 && (
        <InputNForm text={"Masukkan nilai n yang tidak lebih dari 120"} 
          submitHandler={(e) => handleChangeN(e)}
          changeHandler={(e) => setExpN(e.target.value)}
          val={expN}
          min="12"
          max="120"/>
      )}
      {n !== -1 && (
        <div>
          <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={playerWon()} isFinished={isFinished} winningText={`Pemain ${playerWon()} menang dengan dua bilangan tersisa: ${numberList[0]} dan ${numberList[1]}`}/>
          {!isFinished && (
            <div>
              <p className="helper-text">Pilihan bilangan yang ingin dihapus:</p>
              {numberList.map((val) => {
                return (<FactorButton text={val} handler={(e) => handleXRemoval(e, val)}/>)
              })}
            </div>
          )}
          <RestartButton restartCallback={(e) => restart(e)}/>
        </div>
      )}
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source}/>
  )
}

export default HapusSisakanRelatifPrima