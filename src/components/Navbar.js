import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header>
        <img className="logo" src={logo} alt="" />
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span>
            <ion-icon name="menu-outline"></ion-icon>
          </span>
        </label>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About us</Link>
            </li>
            <li>
              <Link to="/Contact">Contact us</Link>
            </li>
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
          </ul>
        </nav>
        <hr />
      </header>
    </>
  );
}
