import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return(
    <>
      <Outlet/>
      <nav>
        <ul>
          <li>
            <Link to="/catur">Chess</Link>
          </li>
          <li>
            <Link to="/kurangkan-faktor-1">Kurangkan Faktor v1</Link>
          </li>
          <li>
            <Link to="/kurangkan-faktor-2">Kurangkan Faktor v2</Link>
          </li>
          <li>
            <Link to="/tebak-angka-dengan-faktor">Tebak angka dengan faktor</Link>
          </li>
          <li>
            <Link to="/tambahkan-proper-divisor">Tambahkan proper divisor</Link>
          </li>
          <li>
            <Link to="/kalikan-terus">Kalikan Terus</Link>
          </li>
          <li>
            <Link to="/hapus-sisakan-relatif-prima">Hapus Sisakan Relatif Prima</Link>
          </li>
        </ul>
      </nav>
      
    </>
  );
};

export default Layout