import { useState } from "react";
import Problem from "../components/big/Problem";
import PlayerTurn from "../components/small/PlayerTurn";
import Board from "../components/chess/Board";
import RestartButton from "../components/small/RestartButton";

const MovingKing = () => {
  const title = "Memindahkan Raja"
  const desc = "A king is placed on square a8 of a chessboard. Players take turns moving the king either downwards, to the right, or along a diagonal going downwards and to the right. The player who places the king on square h1 is the winner."
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"
  
  const [turn, setTurn] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const restart = (e) => {
    e.preventDefault()
    setPositionX(0)
    setPositionY(0)
    setTurn(0)
  }

  const isFilled = (i, j) => {
    return (i === positionX) && (j === positionY)
  }

  const isValid = (i, j) => {
    return ((i === positionX) && (j === positionY + 1)) || ((i === positionX + 1) && (j === positionY)) || ((i === positionX + 1) && (j === positionY + 1))
  }

  const clickHandler = (x, y) => {
    if(isValid(x, y)){
      newPositionHandler(x, y)
    }
  }

  const newPositionHandler = (x, y) => {
    setTurn(t => (t + 1) % 2)
    setPositionX(x)
    setPositionY(y)
  }

  const board = (
    <div>
      <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={positionX === 7 && positionY === 7}/>
      <Board x={8} y={8} filling={() => "K"}
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

export default MovingKing;