import "./Board.css"

const Square = ({isFilled, isValid, onSquareClick}) => {
  return (
    <button className={isValid ? "square-valid" : "square-non-valid"} onClick={onSquareClick}>{isFilled ? "P" : "_"}</button>
  );
}

const Board = (props) => {
  const isValidMove = (xOld, yOld, xNew, yNew) => {
    return((xOld === xNew && yOld < yNew)||(xOld < xNew && yOld === yNew))
  }

  const handleClick = (x, y) => {
    if(isValidMove(props.positionX, props.positionY, x, y)){
      props.setNewPosition(x, y)
    } else {
      // alert("Langkah tidak valid")
    }
  }

  return(
    <>
      {[...Array(props.x)].map((x, i) => {
        return (<div className="board-row">
          {[...Array(props.y)].map((y, j) => {
            return(
            <>
              <Square isFilled={i === props.positionX - 1 && j === props.positionY - 1}
              isValid={isValidMove(props.positionX - 1, props.positionY - 1, i, j)}
              onSquareClick={() => handleClick(i + 1, j + 1)}/>
            </>)
          })}
        </div>)
      })}
    </>
  )
}

export default Board