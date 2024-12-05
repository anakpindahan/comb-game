import "./NumberDisplayer.css"

const NumberDisplayer = ({currNumber}) => {
  return(
    <div className="current-number">
      <p>{currNumber}</p>
    </div>
  )
}

export default NumberDisplayer;