import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Chess from './pages/Chess';
import KurangkanFaktor1 from './pages/KurangkanFaktor1';
import KurangkanFaktor2 from './pages/KurangkanFaktor2';
import GuessNumberByDivisor from './pages/GuessNumberByDivisor';
import TambahkanProperDivisor from './pages/TambahkanProperDivisor';
import KalikanTerus from "./pages/KalikanTerus";
import HapusSisakanRelatifPrima from "./pages/HapusSisakanRelatifPrima";
import Lusophon2022P2 from "./pages/Lusophon2022P2";
import Bachet from "./pages/Bachet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/catur' element={<Chess/>}/>
        <Route path='/kurangkan-faktor-1' element={<KurangkanFaktor1 />}/>
        <Route path='/kurangkan-faktor-2' element={<KurangkanFaktor2 />}/>
        <Route path='/tebak-angka-dengan-faktor' element={<GuessNumberByDivisor />}/>
        <Route path='/tambahkan-proper-divisor' element={<TambahkanProperDivisor/>}/>
        <Route path='/kalikan-terus' element={<KalikanTerus/>}/>
        <Route path='/hapus-sisakan-relatif-prima' element={<HapusSisakanRelatifPrima />}/>
        <Route path='/lusophon-2022-p2' element={<Lusophon2022P2/>}/>
        <Route path='/bachet' element={<Bachet/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
