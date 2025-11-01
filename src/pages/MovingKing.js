import { useState } from "react";
import Problem from "../components/big/Problem";
import PlayerTurn from "../components/small/PlayerTurn";
import Board from "../components/chess/Board";
import RestartButton from "../components/small/RestartButton";

const MovingKing = () => {
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
    <Problem problemId={"movingking"} board={board}/>
  )
}

export default MovingKing;