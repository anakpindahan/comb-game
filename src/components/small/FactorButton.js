import './FactorButton.css'

const FactorButton = ({text, handler}) => {
  return(
    <button className="factor-button" onClick={handler}>
      {text}
    </button>
  )
}

export default FactorButton;