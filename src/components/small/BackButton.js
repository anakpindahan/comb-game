import { Link } from "react-router-dom";
import "./BackButton.css"

const BackButton = () => {
  return(
    <Link to="/">
      <button className="back-button">
        <p>&larr;</p>
      </button>
    </Link>
  )
}

export default BackButton;