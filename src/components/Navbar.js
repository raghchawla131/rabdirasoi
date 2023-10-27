import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <nav className="desktop-nav">
        <div id="logo">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>
            <li>
              <Link to="/Shop" onClick={scrollToTop}>Shop</Link>
            </li>
            <li>
              <Link to="/Contact" onClick={scrollToTop}>Contact us</Link>
            </li>
            <li>
              <Link to="/About" onClick={scrollToTop}>About us</Link>
            </li>
            <li>
              <Link to="/Login" onClick={scrollToTop}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
