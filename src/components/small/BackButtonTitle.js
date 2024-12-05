import BackButton from "./BackButton"
import "./BackButtonTitle.css"

const BackButtonTitle = ({title}) => {
  return(
    <div className="back-title">
      <BackButton/>
      <h1 className="problem-title">{title}</h1>
      <div className="empty-div"/>
    </div>
  )
}

export default BackButtonTitle;