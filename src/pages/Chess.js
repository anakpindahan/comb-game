import { useState } from "react"
import Board from "../components/chess/Board"
import './pages.css'

const Chess = () => {
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

  const restartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
    </svg>
  )

  return(
    <div className="container">
      <h1 className="problem-title">Chess</h1>
      <p className="problem-description">Terdapat sebuah papan berukuran 8 x 8. Sebuah pion berada di petak kiri atas. Pion ini hanya bisa bergerak lurus ke bawah dan ke kanan. Dua pemain secara bergantian menggerakkan pion ini agar sampai di petak kanan bawah. Pemain yang berhasil menggerakkan pion ke petak kanan bawah menang. Siapakah yang memiliki strategi menang?</p>
      <div className="problem-board">
        {positionX === 8 && positionY === 8 ? (
          <p>Pemain {2 - turn} menang</p>
        ) : (
          <p>Giliran Pemain {turn + 1}</p>
        )}
        <Board x={8} y={8} positionX={positionX} positionY={positionY} setNewPosition={handleNewPosition}/>
        <button className="restart-button" onClick={(e) => restart(e)}>
          Restart
          {restartIcon}
        </button>
      </div>
    </div>
  );
};

export default Chess;