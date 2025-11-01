import { useState } from "react"
import Board from "../components/chess/Board"
import "./../components/big/pages.css"
import Problem from "../components/big/Problem";
import RestartButton from "../components/small/RestartButton";
import PlayerTurn from "../components/small/PlayerTurn";

const MovingRook = () => {
  const [turn, setTurn] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  
  const restart = (e) => {
    e.preventDefault()
    setPositionX(0)
    setPositionY(0)
    setTurn(0)
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

  const isFilled = (i, j) => {
    return (i === positionX) && (j === positionY)
  }

  const isValid = (i, j) => {
    return((positionX === i && positionY < j)||(positionX < i && positionY === j))
  }

  const board = (
    <div>
      <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={positionX === 7 && positionY === 7}/>
      <Board x={8} y={8} filling={() => "R"}
      isFilled={isFilled} 
      isValid={isValid}
      setNewPosition={newPositionHandler}
      clickHandler={clickHandler}
      />
      <RestartButton  restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem problemId={"movingrook"} board={board} />
  );
};

export default MovingRook;