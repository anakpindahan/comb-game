import BackButtonTitle from "../small/BackButtonTitle";
import "./../../pages/pages.css"

const Problem = ({title, desc, board, source="Tidak diketahui"}) => {
  return(
    <div className="container">
      <BackButtonTitle title={title}/>
      <div className="problem-description">
        {desc}
        <hr className="problem-hr"/>
        <p className="problem-sources">Sumber: {source}</p>
      </div>
      <div className="problem-board">{board}</div>
    </div>
  )
}

export default Problem;