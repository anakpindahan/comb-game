import { useState } from "react"
import "./pages.css"
import "./kurangkanfaktor.css"

const TambahkanProperDivisor = () => {
  const [currNumber, setCurrNumber] = useState(2)
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const isValid = (factor) => {
    return (currNumber % factor) === 0 && currNumber > factor
  }

  const isWon = (n) => {
    return n >= 1990
  }

  const handleSubmit = (e, val) => {
    e.preventDefault()
    if(isValid(val)){
      if(isWon(currNumber + val)){
        setIsFinished(true)
      }
      setCurrNumber(cn => cn + val)
      setTurn(t => (t + 1) % 2)
    } else if (val === currNumber) {
      alert("Input bukan merupakan faktor yang valid")
    } else {
      alert("Input bukan merupakan faktor")
    }
  }

  const getFactors = (n) => {
    const factors = []
    for(let i = 1; i < n; i++){
      if(n % i === 0){
        factors.push(i)
      }
    }
    return factors
  }

  return(
    <div className="container">
      <h1 className="problem-title">Tambahkan Proper Divisor</h1>
      <p className="problem-description">Start with n = 2. Two players A and B move alternately by adding a proper divisor of n to the current n. The goal is a number ≥ 1990. Who wins?</p>
      <div className="problem-board">
        <div className="current-number">
          <p>{currNumber}</p>
        </div>
        {isWon(currNumber) ? (<p>Pemain {2 - turn} menang</p>) : (<p>Giliran pemain {turn + 1}</p>)}
        {!isFinished && (<p>Pilihan faktor yang ingin ditambahkan:</p>)}
        {!isFinished && getFactors(currNumber).map((val) => {
          return (<button className="factor-button" onClick={(e) => handleSubmit(e, val)}>{val}</button>)
        })}
      </div>
    </div>
  )
}

export default TambahkanProperDivisor