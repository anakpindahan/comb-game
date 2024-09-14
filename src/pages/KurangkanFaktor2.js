import { useState } from "react"
import "./pages.css"
import "./kurangkanfaktor.css"

const KurangkanFaktor2 = () => {
  const [currNumber, setCurrNumber] = useState(120)
  const [turn, setTurn] = useState(0)

  const isValid = (factor) => {
    return currNumber > 0 && factor > 1 && (currNumber % factor) === 0 && currNumber > factor
  }

  const isPrimeOrOne = (n) => {
    for(let i = 2; i <= Math.floor(Math.sqrt(n)); i++){
      if((n % i === 0)){
        return false
      }
    }
    return true
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isValid(val)){
      setCurrNumber(cn => cn - val)
      setTurn(t => (t + 1) % 2)
    } else if (val === 1 || val === currNumber) {
      alert("Input bukan merupakan faktor yang valid")
    } else {
      alert("Input bukan merupakan faktor")
    }
  }

  const getFactors = (n) => {
    const factors = []
    for(let i = 2; i < n; i++){
      if(n % i === 0){
        factors.push(i)
      }
    }
    return factors
  }

  return(
    <div className="container">
      <h1 className="problem-title">Kurangkan Faktor (versi 2)</h1>
      <p className="problem-description">Tertulis bilangan 120. Dua pemain secara bergantian mengurangkan bilangan yang ada dengan salah satu faktor positifnya yang bukan 1 atau bilangan itu sendiri dan mengganti bilangan yang ada dengan hasil tersebut. Pemain yang tidak dapat melakukan langkah kalah. Siapakah yang memiliki strategi menang?</p>
      <div className="problem-board">
        <div className="current-number">
          <p>{currNumber}</p>
        </div>
        {isPrimeOrOne(currNumber) ? (<p>Pemain {2 - turn} menang</p>) : (<p>Giliran pemain {turn + 1}</p>)}
        <p>Pilihan faktor yang ingin dikurangkan:</p>
        {getFactors(currNumber).map((val) => {
          return (<button className="factor-button" onClick={(e) => handleSubmit(e, val)}>{val}</button>)
        })}
      </div>
    </div>
  )
}

export default KurangkanFaktor2