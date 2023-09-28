import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleSidebarClass = isMenuOpen ? "sidebar-show" : ""

  return (
    <>
      <nav className="mobile-nav">
        <div onClick={toggleMenu}>
          <ion-icon id="open-menu" name="menu-outline"></ion-icon>
        </div>
        <div>
          <img className="sidebar-logo" src={logo} alt="" />
        </div>
        <div>
          <ion-icon name="cart-outline"></ion-icon>
        </div>
      </nav>
      <div className={`sidebar ${toggleSidebarClass}`}>
        <div className="sidebar-header">
          <img className="sidebar-logo" src={logo} alt="" />
          <div onClick={toggleMenu}>
            <ion-icon id="close-menu" name="close-outline"></ion-icon>
          </div>
        </div>
        <div className="sidebar-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
            <li>
              <Link to="/Contact">Contact us</Link>
            </li>
            <li>
              <Link to="/About">About us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
