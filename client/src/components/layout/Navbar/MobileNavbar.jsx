import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import Cart from "../../Cart/Cart";
import logo from "../../../assets/rab di rasoi logo.png";
import { AuthContext } from "../../../context/authContext";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import "./MobileNavbar.css";

export default function MobileNavbar({
  isMenuOpen,
  setIsMenuOpen,
  isCartVisible,
  openCart,
  closeCart,
  handleLogout,
}) {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef(null);


const scrollToTop = useScrollToTop();

  const handleLogoClick = useLogoClick();

  return (
    <>
      <CartOverlay isVisible={isCartVisible} onClick={closeCart} />

      <nav className="mobile-nav">
        <div onClick={() => setIsMenuOpen(true)}>
          <ion-icon id="open-menu" name="menu-outline"></ion-icon>
        </div>
        <div>
          <img
            className="sidebar-navbar-logo"
            src={logo}
            alt="logo"
            onClick={handleLogoClick}
          />
        </div>
        <div>
          {/* Use button or div instead of Link because Cart is modal */}
          <button
            className="sidebar__link cart-btn"
            onClick={() => {
              openCart();
              setIsMenuOpen(false); // optional: close menu when cart opens
            }}
            aria-label="Open Cart"
          >
            Cart
          </button>
        </div>
      </nav>

      <div ref={ref} className={`sidebar ${isMenuOpen ? "sidebar--show" : ""}`}>
        <div className="sidebar__header">
          <div onClick={() => setIsMenuOpen(false)} className="sidebar__toggle">
            <ion-icon id="close-menu" name="close-outline"></ion-icon>
          </div>
          <img
            className="sidebar__logo"
            src={logo}
            alt="logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="sidebar__links">
          <ul className="sidebar__list">
            <li>
              <Link to="/" onClick={scrollToTop} className="sidebar__link">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Shop"
                onClick={scrollToTop}
                className="sidebar__link"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                onClick={scrollToTop}
                className="sidebar__link"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                onClick={scrollToTop}
                className="sidebar__link"
              >
                About us
              </Link>
            </li>
            {currentUser ? (
              <li>
                <Link onClick={handleLogout} className="sidebar__link">
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/Login"
                  onClick={scrollToTop}
                  className="sidebar__link"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {isCartVisible && (
        <Cart isCartVisible={isCartVisible} onClose={closeCart} />
      )}
    </>
  );
}
