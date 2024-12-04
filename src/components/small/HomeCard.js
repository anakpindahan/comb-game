import { Link } from "react-router-dom";
import "./HomeCard.css"

const HomeCard = ({title, link}) => {
  return(
    <Link to={link}>
      <button className="home-card-button">
        {title}
      </button>
    </Link>
  )
}

export default HomeCard;