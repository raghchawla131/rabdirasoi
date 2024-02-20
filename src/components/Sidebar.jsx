import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Cart from "./Cart";

export default function Sidebar({
  isCartVisible,
  setIsCartVisible,
  toggleCart,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    if(isMenuOpen) setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    scrollToTop();
    closeMenu();
  };
  
  const toggleSidebarClass = isMenuOpen ? "sidebar-show" : "";
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, [ref]);

  
  return (
    <>
      {isMenuOpen && <div className="overlayMenu"></div>}
      <nav className="mobile-nav">
        <div onClick={toggleMenu}>
          <ion-icon id="open-menu" name="menu-outline"></ion-icon>
        </div>
        <div>
          <img className="sidebar-logo" src={logo} alt="" />
        </div>
        <div>
          <Link to="/Cart" onClick={toggleCart}>
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
        </div>
      </nav>
      <div ref={ref} className={`sidebar ${toggleSidebarClass}`}>
        <div className="sidebar-header">
          <img className="sidebar-logo" src={logo} alt="" />
          <div onClick={toggleMenu}>
            <ion-icon id="close-menu" name="close-outline"></ion-icon>
          </div>
        </div>
        <div className="sidebar-links">
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Shop" onClick={handleLinkClick}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/Contact" onClick={handleLinkClick}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/About" onClick={handleLinkClick}>
                About us
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isCartVisible && (
        <Cart
          isCartVisible={isCartVisible}
          setIsCartVisible={setIsCartVisible}
          toggleCart={toggleCart}
          onClose={() => setIsCartVisible(false)}
        />
      )}
    </>
  );
}
