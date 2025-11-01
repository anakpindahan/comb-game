import { FormattedMessage } from 'react-intl';
import './PlayerTurn.css'

const PlayerTurn = ({ongoingTurnFunc, finishedTurnFunc, isFinished, winningText=`Pemain ${finishedTurnFunc} menang`}) => {
  return(
    <>
      {isFinished ? (
        <p className="turn-text">{winningText}</p>
      ) : (
        <p className="turn-text"><FormattedMessage id="board.turn"/> {ongoingTurnFunc}</p>
      )}
    </>
  )
}

export default PlayerTurn;