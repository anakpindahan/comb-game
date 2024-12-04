import { useState } from "react"
import "./pages.css"
import "./kurangkanfaktor.css"
import BackButton from "../components/small/BackButton"

const KalikanTerus = () => {
  const [currNumber, setCurrNumber] = useState(1)
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [target, setTarget] = useState(999999)

  const isValid = (val) => {
    return Array.from({length: 8}, (_, i) => i + 2).includes(val)
  }

  const isWon = (n) => {
    return n >= target
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isValid(val)){
      if(isWon(currNumber * val)){
        setIsFinished(true)
      }
      setCurrNumber(cn => cn * val)
      setTurn(t => (t + 1) % 2)
    } else {
      alert("Input tidak valid")
    }
  }

  const handleChangeTarget = (e, t) => {
    e.preventDefault()
    setTarget(t)
  }

  return(
    <div className="container">
      <div className="back-title">
        <BackButton/>
        <h1 className="problem-title">Kalikan Terus</h1>
        <div className="empty-div"/>
      </div>
      <p className="problem-description">A and B start with p = 1. Then they alternately multiply p by one of the numbers 2 to 9. The winner is the one who first reaches (a) p ≥ 1000, (b) p ≥ 1000000. Who wins, A or B?</p>
      <div className="problem-board">
        {target === 999999 && (
        <div className="first-selection-div">
          <h2>Pilih nilai p</h2>
          <button className="first-selection-button" onClick={(e) => handleChangeTarget(e, 1000)}>1000</button>
          <button className="first-selection-button" onClick={(e) => handleChangeTarget(e, 1000000)}>1000000</button>
        </div>)}
        {target !== 999999 && (isWon(currNumber) ? (
          <p className="turn-text">Pemain {2 - turn} menang</p>
        ) : (
          <p className="turn-text">Giliran Pemain {turn + 1}</p>
        ))}
        {target !== 999999 && (
          <div className="current-number">
            <p>{currNumber}</p>
          </div>
        )}
        {target !== 999999 && !isFinished && (<p className="helper-text">Pilihan bilangan yang ingin dikalikan:</p>)}
        {target !== 999999 && !isFinished && Array.from({length: 8}, (_, i) => (i + 2)).map((val) => {
          return (<button className="factor-button" onClick={(e) => handleSubmit(e, val)}>{val}</button>)
        })}
      </div>
    </div>
  )
}

export default KalikanTerus