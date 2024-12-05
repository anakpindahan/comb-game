import './PlayerTurn.css'

const PlayerTurn = ({ongoingTurnFunc, finishedTurnFunc, isFinished, winningText=`Pemain ${finishedTurnFunc} menang`}) => {
  return(
    <>
      {isFinished ? (
        <p className="turn-text">{winningText}</p>
      ) : (
        <p className="turn-text">Giliran Pemain {ongoingTurnFunc}</p>
      )}
    </>
  )
}

export default PlayerTurn;