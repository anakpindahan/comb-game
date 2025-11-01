import LangSwitcher from "../../i18n/LangSwitcher";
import BackButton from "./BackButton"
import "./TopPart.css"

const TopPart = ({title}) => {
  return(
    <div className="back-title">
      <BackButton/>
      <h1 className="problem-title">{title}</h1>
      <LangSwitcher/>
    </div>
  )
}

export default TopPart;