import { useState } from "react"
import "./pages.css"
import "./kurangkanfaktor.css"
import BackButton from "../components/small/BackButton"

const KurangkanFaktor1 = () => {
  const [currNumber, setCurrNumber] = useState(120)
  const [turn, setTurn] = useState(0)

  const isValid = (factor) => {
    return currNumber > 0 && factor > 0 && (currNumber % factor) === 0
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isValid(val)){
      setCurrNumber(cn => cn - val)
      setTurn(t => (t + 1) % 2)
    } else {
      alert("Input bukan merupakan faktor")
    }
  }

  const getFactors = (n) => {
    const factors = []
    for(let i = 1; i <= n; i++){
      if(n % i === 0){
        factors.push(i)
      }
    }
    return factors
  }

  return(
    <div className="container">
      <div className="back-title">
        <BackButton/>
        <h1 className="problem-title">Kurangkan Faktor (versi 1)</h1>
        <div className="empty-div"/>
      </div>
      <p className="problem-description">Tertulis bilangan 120. Dua pemain secara bergantian mengurangkan bilangan yang ada dengan salah satu faktor positifnya dan mengganti bilangan yang ada dengan hasil tersebut. Pemain yang menuliskan angka 0 kalah. Siapakah yang memiliki strategi menang?</p>
      <div className="problem-board">
        {currNumber === 0 ? (
          <p className="turn-text">Pemain {turn + 1} menang</p>
        ) : (
          <p className="turn-text">Giliran Pemain {turn + 1}</p>
        )}
        <div className="current-number">
          <p>{currNumber}</p>
        </div>
        {currNumber > 0 && (<p className="helper-text">Pilihan faktor yang ingin dikurangkan:</p>)}
        {getFactors(currNumber).map((val) => {
          return (<button className="factor-button" onClick={(e) => handleSubmit(e, val)}>{val}</button>)
        })}
      </div>
    </div>
  )
}

export default KurangkanFaktor1