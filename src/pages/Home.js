import { Link } from "react-router-dom";
import HomeCard from "../components/small/HomeCard";

const link_title = {
  "/catur": "Chess",
  "/kurangkan-faktor-1": "Kurangkan Faktor v1",
  "/kurangkan-faktor-2": "Kurangkan Faktor v2",
  "/tebak-angka-dengan-faktor": "Tebak angka dengan faktor",
  "/tambahkan-proper-divisor": "Tambahkan proper divisor",
  "/kalikan-terus": "Kalikan terus",
  "/hapus-sisakan-relatif-prima": "Hapus sisakan relatif prima"
}

const Home = () => {
  return(
    <div className="first-container">
      <h1>Home</h1>
      {Object.keys(link_title).map(key => {
        return(<HomeCard link={key} title={link_title[key]}/>)
      })}
    </div>
  );
};

export default Home;