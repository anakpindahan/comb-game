import { useState } from "react"
import Board from "../components/chess/Board"
import './pages.css'
import Problem from "../components/big/Problem";
import RestartButton from "../components/small/RestartButton";
import PlayerTurn from "../components/small/PlayerTurn";

const Chess = () => {
  const title = "Chess"
  const desc = "Terdapat sebuah papan berukuran 8 x 8. Sebuah pion berada di petak kiri atas. Pion ini hanya bisa bergerak lurus ke bawah dan ke kanan. Dua pemain secara bergantian menggerakkan pion ini agar sampai di petak kanan bawah. Pemain yang berhasil menggerakkan pion ke petak kanan bawah menang. Siapakah yang memiliki strategi menang?"
  const source = "Mathematical Circles (Russian Experience) - Dmitri Fomin, Sergey Genkin, Ilia Itenberg"

  const [turn, setTurn] = useState(0)
  const [positionX, setPositionX] = useState(1)
  const [positionY, setPositionY] = useState(1)
  
  const restart = (e) => {
    e.preventDefault()
    setPositionX(1)
    setPositionY(1)
    setTurn(0)
  }

  const handleNewPosition = (x, y) => {
    setTurn(t => (t + 1) % 2)
    setPositionX(x)
    setPositionY(y)
  }

  const board = (
    <div>
      <PlayerTurn ongoingTurnFunc={turn + 1} finishedTurnFunc={2 - turn} isFinished={positionX === 8 && positionY === 8}/>
      <Board x={8} y={8} positionX={positionX} positionY={positionY} setNewPosition={handleNewPosition}/>
      <RestartButton  restartCallback={(e) => restart(e)}/>
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source} />
  );
};

export default Chess;