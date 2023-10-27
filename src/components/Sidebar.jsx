import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const handleLinkClick = () => {
    scrollToTop();
    closeMenu();
  }

  const toggleSidebarClass = isMenuOpen ? "sidebar-show" : "";

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
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/Shop" onClick={handleLinkClick}>Shop</Link>
            </li>
            <li>
              <Link to="/Contact" onCanPlay={handleLinkClick}>Contact us</Link>
            </li>
            <li>
              <Link to="/About" onClick={handleLinkClick}>About us</Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleLinkClick}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}