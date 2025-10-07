import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import InputNForm from "../components/small/InputNForm"
import RestartButton from "../components/small/RestartButton"
import { sumOfDigits } from "../utils"

const AmbilJumlahDigit = () => {
  const title = "Ambil Jumlah Digit"
  const desc = "There is a pile with 2022 rocks. Ana and Beto play by turns to the following game, starting with Ana: in each turn, if there are n rocks in the pile, the player can remove S(n) rocks or n-S(n) rocks, where S(n) is the sum of the the digits of n. The person who removes the last rock wins. Determine which of the two players has a winning strategy and describe it."
  const source = "CentroAmerican MO 2022 P1"

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
    if(currNumber > 0){
      if(currNumber === 2*sumOfDigits(currNumber)){
        return [sumOfDigits(currNumber)]
      } else if(currNumber < 10){
        return [currNumber]
      } else {
        return [sumOfDigits(currNumber), currNumber - sumOfDigits(currNumber)]
      }
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
            {currNumber > 0 && (<p className="helper-text">Pilih banyak batu yang ingin diambil</p>)}
            {validSteps().map((val) => {
              return (<FactorButton text={val} handler={(e) => handleSubtractor(e, val)}/>)
            })}
          </div>
          <RestartButton restartCallback={(e) => restart(e)}/>
        </div>  
      ) : (
        <div>
          <InputNForm text={"Masukkan nilai n yang tidak lebih dari 5000 dan tidak kurang dari 1"}
            submitHandler={(e) => handleChangeN(e)}
            changeHandler={(e) => setExpN(e.target.value)}
            val={expN}
            min={"1"}
            max={"5000"}
          />
        </div>
      )}
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source} />
  )
}

export default AmbilJumlahDigit