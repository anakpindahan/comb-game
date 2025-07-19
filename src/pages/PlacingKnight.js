import { useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import Board from "../components/chess/Board"
import RestartButton from "../components/small/RestartButton"

const PlacingKnight = () => {
  const title = "Taruh Kuda"
  const desc = "Two players take turns placing knights on the squares of a chessboard, so that no knight can take another. The player who is unable to do this loses."
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

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
    const ynzero = (y > 0)
    const ynone = (y > 1)
    const ynlast = (y < size - 1)
    const ynblast = (y < size - 2)
    const xnzero = (x > 0)
    const xnone = (x > 1)
    const xnblast = (x < size - 2)
    const xnlast = (x < size - 1)

    const newSquareStatus = [...squareStatus]
    const newSquareStatusNested = [...squareStatus[x]]

    newSquareStatusNested[y] = 1
    setValidCount(vc => vc - 1)
    newSquareStatus[x] = newSquareStatusNested

    if(xnzero){
      if(xnone){
        const newSquareStatusNested = [...squareStatus[x - 2]]
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
        newSquareStatus[x - 2] = newSquareStatusNested
      }
      const newSquareStatusNested = [...squareStatus[x - 1]]
      if(ynone){
        if(newSquareStatusNested[y - 2] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y - 2] = -1
      }
      if(ynblast){
        if(newSquareStatusNested[y + 2] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y + 2] = -1
      }
      newSquareStatus[x - 1] = newSquareStatusNested
    }

    if(xnlast){
      if(xnblast){
        const newSquareStatusNested = [...squareStatus[x + 2]]
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
        newSquareStatus[x + 2] = newSquareStatusNested
      }
      const newSquareStatusNested = [...squareStatus[x + 1]]
      if(ynone){
        if(newSquareStatusNested[y - 2] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y - 2] = -1
      }
      if(ynblast){
        if(newSquareStatusNested[y + 2] !== -1){
          setValidCount(vc => vc - 1)
        }
        newSquareStatusNested[y + 2] = -1
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
      <Board x={size} y={size} filling={() => "N"}
        isFilled={isFilled}
        isValid={isValid}
        setNewPosition={newPositionHandler}
        clickHandler={clickHandler}
      />
      <RestartButton restartCallback={(e) => restart(e)}/>
    </div>
  )

  return (
    <Problem title={title} desc={desc} source={source} board={board}/>
  )
}

export default PlacingKnight