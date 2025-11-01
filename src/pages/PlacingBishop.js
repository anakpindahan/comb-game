import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import Board from "../components/chess/Board"
import RestartButton from "../components/small/RestartButton"

const PlacingBishop = () => {
  const size = 8
  const [turn, setTurn] = useState(0)
  const [squareStatus, setSquareStatus] = useState(Array(size).fill(0).map(() => Array(size).fill(0)))
  // empty and valid = 0, empty and not valid = -1, not empty = 1
  const [validCount, setValidCount] = useState(size * size)

  const restart = (e) => {
    e.preventDefault()
    setTurn(0)
    setSquareStatus(Array(size).fill(0).map(() => Array(size).fill(0)))
    setValidCount(size * size)
  }

  const isValid = (i, j) => {
    return squareStatus[i][j] === 0
  }

  const isFilled = (i, j) => {
    return squareStatus[i][j] === 1
  }

  const newPositionHandler = (x, y) => {
    setTurn(t => (t + 1) % 2)

    const dulbr = x - y
    const dblur = x + y
    
    const newSquareStatus = [...squareStatus]
    for(let i=0; i<size; i++){
      if(i !== x){
        const newSquareStatusNested = [...squareStatus[i]]
        if(i >= dulbr){
          newSquareStatusNested[i - dulbr] = -1
        }
        if(size > (dblur - i)){
          newSquareStatusNested[dblur - i] = -1
        }
        newSquareStatus[i] = newSquareStatusNested
      } else {
        const newSquareStatusNested = [...squareStatus[x]]
        newSquareStatusNested[y] = 1 
        newSquareStatus[x] = newSquareStatusNested
      }
    }

    setSquareStatus(newSquareStatus)
  }

  const clickHandler = (x, y) => {
    if(isValid(x, y)){
      newPositionHandler(x, y)
    }
  }

  const board = (
    <div>
      <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={validCount <= 0} />
      <Board x={size} y={size} filling={() => "B"}
        isFilled={isFilled}
        isValid={isValid}
        setNewPosition={newPositionHandler}
        clickHandler={clickHandler}
      />
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return (
    <Problem problemId={"placingbishop"} board={board}/>
  )
}

export default PlacingBishop