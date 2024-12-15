import { useState } from "react"
import Board from "../components/chess/Board"
import './pages.css'
import Problem from "../components/big/Problem";
import RestartButton from "../components/small/RestartButton";
import PlayerTurn from "../components/small/PlayerTurn";

const MovingRook = () => {
  const title = "Memindahkan Benteng"
  const desc = "Terdapat sebuah papan berukuran 8 x 8. Sebuah benteng berada di petak kiri atas. Benteng ini hanya bisa bergerak lurus ke bawah dan ke kanan. Dua pemain secara bergantian menggerakkan benteng ini agar sampai di petak kanan bawah. Pemain yang berhasil menggerakkan benteng ke petak kanan bawah menang. Siapakah yang memiliki strategi menang?"
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
      <Board x={8} y={8} filling="R"
      isFilled={isFilled} 
      isValid={isValid}
      setNewPosition={newPositionHandler}
      clickHandler={clickHandler}
      />
      <RestartButton  restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source} />
  );
};

export default MovingRook;