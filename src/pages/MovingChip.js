import { useEffect, useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import Board from "../components/chess/Board"
import RestartButton from "../components/small/RestartButton"
import InputNForm from "../components/small/InputNForm"

const MovingChip = () => {
  const title = "Pindahkan Chip"
  const desc = "Initially there is a chip at the corner of an n × n-chessboard. A and B alternately move the chip one step in any direction. They may not move to a square already visited. The loser is the one who cannot move. (a) Who wins for even n? (b) Who wins for odd n? (c) Who wins if the chip starts on a square, which is neighbor to acorner square?"
  const source = "Problem-Solving Strategies - Arthur Engel"


  const [n, setN] = useState(-1)
  const [expN, setExpN] = useState(8)
  const [turn, setTurn] = useState(0)
  const [squareStatus, setSquareStatus] = useState([])
  const [validSquares, setValidSquares] = useState([[0, 1], [1, 0]]) 
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const restart = (e) => {
    e.preventDefault()
    setN(-1)
    setExpN(8)
    setTurn(0)
    setPositionX(0)
    setPositionY(0)
    setValidSquares([[0, 1], [1, 0]])
  }

  const handleChangeN = (e) => {
    e.preventDefault()
    setN(Number(expN))
    let firstPosition = Array(Number(expN)).fill(0).map(() => Array(Number(expN)).fill(0))
    firstPosition[0][0] = 1
    setSquareStatus(firstPosition)
  }

  const clickHandler = (x, y) => {
    if(isValid(x, y)){
      newPositionHandler(x, y)
    }
  }

  useEffect(() => {
    
  }, [squareStatus])

  const newPositionHandler = (x, y) => {
    setTurn(t => (t + 1) % 2)
    setPositionX(x)
    setPositionY(y)

    let newSquareStatus = [...squareStatus]
    let newSquareStatusNested = [...squareStatus[positionX]]
    newSquareStatusNested[positionY] = -1
    newSquareStatus[positionX] = newSquareStatusNested

    newSquareStatusNested = [...newSquareStatus[x]]
    newSquareStatusNested[y] = 1
    newSquareStatus[x] = newSquareStatusNested
    setSquareStatus(newSquareStatus)
  }

  useEffect(() => {
    if(n !== -1 && squareStatus.length > 1){
      const newValidSquares = []
      if(positionX > 0){
        if(squareStatus[positionX - 1][positionY] !== -1){
          newValidSquares.push([positionX - 1, positionY])
        }
      }
      if(positionX < n - 1){
        if(squareStatus[positionX + 1][positionY] !== -1){
          newValidSquares.push([positionX + 1, positionY])
        }
      }
      if(positionY > 0){
        if(squareStatus[positionX][positionY - 1] !== -1){
          newValidSquares.push([positionX, positionY - 1])
        }
      }
      if(positionY < n - 1){
        if(squareStatus[positionX][positionY + 1] !== -1){
          newValidSquares.push([positionX, positionY + 1])
        }
      }
      setValidSquares(newValidSquares)
    }
  }, [n, squareStatus, positionX, positionY])

  const isValid = (i, j) => {
    const firstFiltered = validSquares.filter((el) => el[0] === i)
    const finalFiltered = firstFiltered.filter((el) => el[1] === j)
    if(finalFiltered.length === 1){
      return true
    } else {
      return false
    }
  }

  const isFilled = (i, j) => {
    return squareStatus[i][j] !== 0
  }

  const board = (
    <div>
      {n === -1 && (
        <InputNForm text={"Masukkan nilai n yang tidak lebih dari 15 dan tidak kurang dari 2"} 
          submitHandler={(e) => handleChangeN(e)}
          changeHandler={(e) => setExpN(e.target.value)}
          val={expN}
          min="2"
          max="15"/>
      )}
      {n !== -1 && (
        <div>
          <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={validSquares.length === 0} />
          <Board x={n} y={n} filling={(i, j) => squareStatus[i][j] === 1 ? 'C' : "X"}
          isFilled={isFilled}
          isValid={isValid}
          clickHandler={clickHandler}
          />
          <RestartButton restartCallback={(e) => restart(e)} />
        </div>
      )}

    </div>
  )

  return (
    <Problem title={title} desc={desc} source={source} board={board}/>
  )
}

export default MovingChip