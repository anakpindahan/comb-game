import { FormattedMessage } from "react-intl";
import TopPart from "../small/TopPart";
import "./pages.css"

const Problem = ({problemId, board}) => {
  return(
    <div className="container">
      <TopPart title={<FormattedMessage id={`problems.${problemId}.title`}/>}/>
      <div className="problem-description">
        <FormattedMessage id={`problems.${problemId}.description`}/>
        <hr className="problem-hr"/>
        <p className="problem-sources"><FormattedMessage id="problem.source"/>: <FormattedMessage id={`problems.${problemId}.source`}/></p>
      </div>
      <div className="problem-board">{board}</div>
    </div>
  )
}

export default Problem;