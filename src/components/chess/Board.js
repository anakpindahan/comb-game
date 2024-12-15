import "./Board.css"

const Square = ({isFilled, filling, isValid, onSquareClick}) => {
  return (
    <button className={isValid ? "square-valid" : "square-non-valid"} onClick={onSquareClick}>{isFilled ? filling : ""}</button>
  );
}

const Board = (props) => {

  return(
    <>
      {[...Array(props.x)].map((_, i) => {
        return (<div className="board-row">
          {[...Array(props.y)].map((_, j) => {
            return(
            <>
              <Square isFilled={props.isFilled(i, j)}
              filling={props.filling}
              isValid={props.isValid(i, j)}
              onSquareClick={() => props.clickHandler(i, j)}/>
            </>)
          })}
        </div>)
      })}
    </>
  )
}

export default Board