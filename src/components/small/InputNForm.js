import './InputNForm.css'

const InputNForm = ({text, submitHandler, changeHandler, val, min, max}) => {
  return (
    <div className="first-selection-div">
      <h2 className="helper-text">{text}</h2>
      <form onSubmit={submitHandler}>
        <input className="first-selection-input" type="number" value={val} onChange={changeHandler} min={min} max={max}/>
      </form>
    </div>
  )
}

export default InputNForm;