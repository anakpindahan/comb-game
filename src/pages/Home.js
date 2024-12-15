import HomeCard from "../components/small/HomeCard";

let title_link = {
  "Pindahkan Benteng": "/moving-rook",
  "Kurangkan Faktor v1": "/kurangkan-faktor-1",
  "Kurangkan Faktor v2": "/kurangkan-faktor-2",
  // "Tebak angka dengan faktor": "/tebak-angka-dengan-faktor",
  "Tambahkan proper divisor": "/tambahkan-proper-divisor",
  "Kalikan terus": "/kalikan-terus",
  "Hapus sisakan relatif prima": "/hapus-sisakan-relatif-prima",
  "Fruits in a Box": "/lusophon-2022-p2",
  "Bachet's Game": "/bachet",
  "Pindahkan Raja": "/moving-king",
  "Taruh Raja": "/placing-king",
  "Taruh Kuda": "/placing-knight",
  "Kurangkan Dua Berpangkat": "/subtract-power-of-2",
  "Tambahkan yang lebih kecil": "add-smaller",
  "Kurangkan Tak Lebih dari Setengah": "subtract-less-than-half"
}

let title_link_arr = Object.keys(title_link)
title_link_arr.sort()

const Home = () => {
  return(
    <div className="first-container">
      <h1>Permainan Kombinatorika Divisualisasikan</h1>
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