import { useEffect, useState } from "react"
import Problem from "../components/big/Problem"
import PlayerTurn from "../components/small/PlayerTurn"
import NumberDisplayer from "../components/small/NumberDisplayer"
import FactorButton from "../components/small/FactorButton"
import InputNForm from "../components/small/InputNForm"
import RestartButton from "../components/small/RestartButton"
import io from 'socket.io-client'

const socket = io('http://localhost:4000')
socket.on('connection', (socket) => {
  console.log(socket.id);
});

const Bachet = () => {
  const title = "Bachet's Game"
  const desc = "Dua orang pemain bermain dengan n batu. Dalam setiap langkahnya, seorang pemain dapat mengambil 1, 2, atau 3 batu. Pemain yang mengambil batu terakhir menang. Siapakah yang memiliki strategi menang untuk nilai n tertentu?"
  const source = "Problem-Solving Strategies - Arthur Engel"

  const [expN, setExpN] = useState(1)
  const [gameState, setGameState] = useState({
    turn: 0,
    currNumber: -1,
  })

  const restart = (e) => {
    e.preventDefault()
    setGameState({
      turn: 0,
      currNumber: -1
    })
    setExpN(1)
    socket.emit('restarted', 'yes')
  }

  const validSteps = () => {
    if(gameState.currNumber > 3){
      return [1, 2, 3]
    } else if(gameState.currNumber > 0){
      return Array.from({length: gameState.currNumber}, (_, i) => i + 1)
    } else {
      return []
    }
  }

  const handleChangeN = (e) => {
    e.preventDefault()
    setGameState({
      turn: 0,
      currNumber: Number(expN)
    })
    socket.emit('setN', Number(expN))
  }

  const handleSubtractor = (e, v) => {
    e.preventDefault()
    setGameState({
      turn: (gameState.turn + 1) % 2,
      currNumber: gameState.currNumber - v
    })
    socket.emit('makeMove', {gameState: gameState, v: v})
  }

  const generateRoomCode = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    alert(result)
    return result;
  }

  useEffect(() => {
    socket.on('gameState', (state) => {
      setGameState(state)
    })

    return () => socket.off('gameState')
  }, [])

  const board = (
    <div>
      {gameState.currNumber !== -1 ? (
        <div>
          <div>
            <PlayerTurn ongoingTurnFunc={gameState.turn + 1} finishedTurnFunc={2 - gameState.turn} isFinished={gameState.currNumber === 0}/>
            <NumberDisplayer currNumber={gameState.currNumber}/>
            {gameState.currNumber > 0 && (<p className="helper-text">Pilih banyak batu yang ingin diambil</p>)}
            {validSteps().map((val) => {
              return (<FactorButton text={val} handler={(e) => handleSubtractor(e, val)}/>)
            })}
          </div>
          <RestartButton restartCallback={(e) => restart(e)}/>
        </div>  
      ) : (
        <div>
          <InputNForm text={"Masukkan nilai n yang tidak lebih dari 120 dan tidak kurang dari 1"}
            submitHandler={(e) => handleChangeN(e)}
            changeHandler={(e) => setExpN(e.target.value)}
            val={expN}
            min={"1"}
            max={"120"}
          />
          <FactorButton text={'+'} handler={(e) => generateRoomCode()}/>
        </div>
      )}
    </div>
  )

  return(
    <Problem title={title} desc={desc} board={board} source={source} />
  )
}

export default Bachet