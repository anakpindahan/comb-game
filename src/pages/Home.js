import { Link } from "react-router-dom";
import HomeCard from "../components/small/HomeCard";

let title_link = {
  "Chess": "/catur",
  "Kurangkan Faktor v1": "/kurangkan-faktor-1",
  "Kurangkan Faktor v2": "/kurangkan-faktor-2",
  "Tebak angka dengan faktor": "/tebak-angka-dengan-faktor",
  "Tambahkan proper divisor": "/tambahkan-proper-divisor",
  "Kalikan terus": "/kalikan-terus",
  "Hapus sisakan relatif prima": "/hapus-sisakan-relatif-prima"
}

let title_link_arr = Object.keys(title_link)
title_link_arr.sort()

const Home = () => {
  return(
    <div className="first-container">
      <h1>Home</h1>
      <div className="home-cards-container">
        {title_link_arr
          .map(key => {
          return(<HomeCard link={title_link[key]} title={key}/>)
        })}
      </div>
    </div>
  );
};

export default Home;