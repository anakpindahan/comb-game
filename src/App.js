import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import MovingRook from './pages/MovingRook';
import KurangkanFaktor1 from './pages/KurangkanFaktor1';
import KurangkanFaktor2 from './pages/KurangkanFaktor2';
import GuessNumberByDivisor from './pages/GuessNumberByDivisor';
import TambahkanProperDivisor from './pages/TambahkanProperDivisor';
import KalikanTerus from "./pages/KalikanTerus";
import HapusSisakanRelatifPrima from "./pages/HapusSisakanRelatifPrima";
import Iberoamerican2011P1 from "./pages/Iberoamerican2011P1";
import Lusophon2022P2 from "./pages/Lusophon2022P2";
import Bachet from "./pages/Bachet";
import MovingKing from "./pages/MovingKing";
import PlacingKing from "./pages/PlacingKing";
import PlacingKnight from "./pages/PlacingKnight";
import SubtractPowerOfTwo from "./pages/SubtractPowerOfTwo";
import AddSmaller from "./pages/AddSmaller";
import SubtractLessThanHalf from "./pages/SubtractLessThanHalf";
import MovingChip from "./pages/MovingChip";
import PlacingBishop from "./pages/PlacingBishop";
import AmbilJumlahDigit from "./pages/AmbilJumlahDigit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/moving-rook' element={<MovingRook/>}/>
        <Route path='/kurangkan-faktor-1' element={<KurangkanFaktor1 />}/>
        <Route path='/kurangkan-faktor-2' element={<KurangkanFaktor2 />}/>
        <Route path='/tebak-angka-dengan-faktor' element={<GuessNumberByDivisor />}/>
        <Route path='/tambahkan-proper-divisor' element={<TambahkanProperDivisor/>}/>
        <Route path='/kalikan-terus' element={<KalikanTerus/>}/>
        <Route path='/hapus-sisakan-relatif-prima' element={<HapusSisakanRelatifPrima />}/>
        <Route path='/iberoamerican-2011-p1' element={<Iberoamerican2011P1/>}/>
        <Route path='/lusophon-2022-p2' element={<Lusophon2022P2/>}/>
        <Route path='/bachet' element={<Bachet/>}/>
        <Route path='/moving-king' element={<MovingKing/>}/>
        <Route path='/placing-king' element={<PlacingKing/>}/>
        <Route path='/placing-knight' element={<PlacingKnight/>}/>
        <Route path='/subtract-power-of-2' element={<SubtractPowerOfTwo/>}/>
        <Route path='/add-smaller' element={<AddSmaller/>}/>
        <Route path='/subtract-less-than-half' element={<SubtractLessThanHalf/>}/>
        <Route path='/moving-chip' element={<MovingChip/>}/>
        <Route path='/placing-bishop' element={<PlacingBishop/>}/>
        <Route path='/ambil-jumlah-digit' element={<AmbilJumlahDigit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
