import { useState } from "react"
import "./pages.css"
import "./kurangkanfaktor.css"

const HapusSisakanRelatifPrima = () => {
  const [turn, setTurn] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [n, setN] = useState(-1)
  const [expN, setExpN] = useState(12)
  const [numberList, setNumberList] = useState([])

  const gcd = (a, b) => {
    return (a === 0 ? b : (b === 0 ? a : gcd (b, a % b)))
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

  return(
    <div className="container">
      <h1 className="problem-title">Hapus Sisakan Relatif Prima</h1>
      <p className="problem-description">Start with n ≥ 12 successive positive integers. A and B alternately take one integer, until only two integers a and b are left. A wins if gcd(a, b) = 1, and B wins if gcd(a, b) > 1. Who wins?</p>
      <div className="problem-board">
        {n === -1 && (
        <div className="first-selection-div">
          <h3>Masukkan nilai n</h3>
          <form onSubmit={(e) => handleChangeN(e)}>
            <input className="first-selection-input" type="number" value={expN} onChange={(e) => setExpN(e.target.value)} min="12" />
            <input className="first-selection-submit" type="submit" value="&rarr;"/>
          </form>
        </div>)}
        {n !== -1 && (isFinished 
        ? (<p>Pemain {playerWon()} menang dengan dua bilangan tersisa: {numberList[0]} dan {numberList[1]}</p>) 
        : (<p>Giliran pemain {turn + 1}</p>))}
        {n !== -1 && !isFinished && (<p>Pilihan bilangan yang ingin dihapus:</p>)}
        {n !== -1 && !isFinished && numberList.map((val) => {
          return (<button className="factor-button" onClick={(e) => handleXRemoval(e, val)}>{val}</button>)
        })}
      </div>
    </div>
  )
}

export default HapusSisakanRelatifPrima