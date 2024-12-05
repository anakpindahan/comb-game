import { useState } from "react"
import Problem from "../components/big/Problem"

const GuessNumberByDivisor = () => {
  const title = "Tebak angka berdasarkan faktor"
  const desc = `William is thinking of an integer between 1 and 50, inclusive. 
  Victor can choose a positive integer m and ask William: "does m divide your number?"
  , to which William must answer truthfully. Victor continues asking these questions until 
  he determines William's number. 
  What is the minimum number of questions that Victor needs to guarantee this?`
  const source = "Kanada MO 2023 P1"
  

  const secretNumber = useState(Math.floor(1 + Math.random() * 50))
  const [numQuestionsAsked, setNumQuestionsAsked] = useState(0)
  const [questionAnswer, setQuestionAnswer] = useState(false)
  const [factor, setFactor] = useState(0)
  const [expFactor, setExpFactor] = useState(factor)
  const [guessedNumber, setGuessedNumber] = useState(0)
  const [gameStatus, setGameStatus] = useState(0)

  const isValid = (factor) => {
    return factor > 0
  }
  const handleSubmitFactor = (e) => {
    e.preventDefault()
    if(isValid(expFactor)){
      setFactor(expFactor)
      setQuestionAnswer((secretNumber % expFactor) === 0) 
      setNumQuestionsAsked(nq => nq + 1)
    } else {
      alert("Masukkan bilangan asli")
    }
  }

  const handleSubmitGuessedNumber = (e) => {
    e.preventDefault()
    if(secretNumber === parseInt(guessedNumber)){
      setGameStatus(1)
    } else {
      setGameStatus(-1)
    }
  }

  const board = (
    <>
      <p>Pertanyaan yang telah ditanyakan: {numQuestionsAsked}</p>
      {gameStatus !== 0 && (gameStatus === 1 ? (<p>Victor berhasil menebak angka dengan menanyakan {numQuestionsAsked} pertanyaan</p>) : (<p>Victor menebak angka yang salah</p>))}
      {questionAnswer ? (<p>{factor} adalah faktor</p>) : (<p>{factor} bukanlah faktor</p>)}
      <form onSubmit={(e) => handleSubmitFactor(e)}>
        <label>
          Faktor yang ingin ditanyakan:
          <input type="number" value={expFactor} onChange={(e) => setExpFactor(e.target.value)}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <form onSubmit={(e) => handleSubmitGuessedNumber(e)}>
        <label>
          Bilangan yang ditebak:
          <input type="number" value={guessedNumber} onChange={(e) => setGuessedNumber(e.target.value)}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source}/>
  )
}

export default GuessNumberByDivisor