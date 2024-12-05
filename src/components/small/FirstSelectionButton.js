import './FirstSelectionButton.css'

const FirstSelectionButton = ({val, handler}) => {
  return(
    <button className="first-selection-button" onClick={handler}>
      {val}
    </button>
  )
}

export default FirstSelectionButton;