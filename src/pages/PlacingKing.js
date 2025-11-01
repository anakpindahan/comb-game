import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import Board from "../components/chess/Board"
import RestartButton from "../components/small/RestartButton"

const PlacingKing = () => {
  const size = 9
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
    const ynzero = (y !== 0)
    const ynlast = (y !== size - 1)
    const xnzero = (x !== 0)
    const xnlast = (x !== size - 1)

    const newSquareStatus = [...squareStatus]
    const newSquareStatusNested = [...squareStatus[x]]

    newSquareStatusNested[y] = 1
    setValidCount(vc => vc - 1)
    if(ynzero){
      if(newSquareStatusNested[y - 1] !== -1){
        setValidCount(vc => vc - 1)
      }
      newSquareStatusNested[y - 1] = -1

    }
    if(ynlast){
      if(newSquareStatusNested[y + 1] !== -1){
        setValidCount(vc => vc - 1)        
      }
      newSquareStatusNested[y + 1] = -1
    }
    newSquareStatus[x] = newSquareStatusNested

    if(xnzero){
      const newSquareStatusNested = [...squareStatus[x - 1]]
      if(newSquareStatusNested[y] !== -1){
        setValidCount(vc => vc - 1)        
      }
      newSquareStatusNested[y] = -1

      if(ynzero){
        if(newSquareStatusNested[y - 1] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y - 1] = -1
      }
      if(ynlast){
        if(newSquareStatusNested[y + 1] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y + 1] = -1
      }
      newSquareStatus[x - 1] = newSquareStatusNested
    }

    if(xnlast){
      const newSquareStatusNested = [...squareStatus[x + 1]]
      if(newSquareStatusNested[y] === 0){
        setValidCount(vc => vc - 1)
      }
      newSquareStatusNested[y] = -1

      if(ynzero){
        if(newSquareStatusNested[y - 1] === 0){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y - 1] = -1
      }
      if(ynlast){
        if(newSquareStatusNested[y + 1] === 0){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y + 1] = -1
      }
      newSquareStatus[x + 1] = newSquareStatusNested
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
      <Board x={size} y={size} filling={() => "K"}
        isFilled={isFilled}
        isValid={isValid}
        setNewPosition={newPositionHandler}
        clickHandler={clickHandler}
      />
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return (
    <Problem problemId={"placingking"} board={board}/>
  )
}

export default PlacingKing