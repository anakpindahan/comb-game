import { useState } from "react"
import { getFactors } from "../utils"
import "./pages.css"
import "./../components/small/HelperText.css"
import Problem from "../components/big/Problem"
import RestartButton from "../components/small/RestartButton"
import NumberDisplayer from "../components/small/NumberDisplayer"
import PlayerTurn from "../components/small/PlayerTurn"
import FactorButton from "../components/small/FactorButton"

const KurangkanFaktor1 = () => {
  const title = "Kurangkan Faktor (versi 1)"
  const desc = "Tertulis bilangan 120. Dua pemain secara bergantian mengurangkan bilangan yang ada dengan salah satu faktor positifnya dan mengganti bilangan yang ada dengan hasil tersebut. Pemain yang menuliskan angka 0 kalah. Siapakah yang memiliki strategi menang?"
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

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
        <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={turn + 1} isFinished={currNumber === 0} />
        <NumberDisplayer currNumber={currNumber}/>
        {currNumber > 0 && (<p className="helper-text">Pilihan faktor yang ingin dikurangkan:</p>)}
        {getFactors(currNumber).map((val) => {
          return (<FactorButton text={val} handler={(e) => handleSubmit(e, val)} />)
        })}
      </div>
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} source={source} board={board} />
  )
}

export default KurangkanFaktor1