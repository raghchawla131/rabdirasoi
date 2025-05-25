import { Link } from "react-router-dom";
import { useContext } from "react";
import Cart from "../../Cart/Cart";
import logo from "../../../assets/rab di rasoi logo.png";
import { AuthContext } from "../../../context/authContext";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import "./DesktopNavbar.css";

export default function DesktopNavbar({
  isCartVisible,
  openCart,
  closeCart,
  handleLogout,
}) {
  const { currentUser } = useContext(AuthContext);

  const handleLogoClick = useLogoClick();

  const scrollToTop = useScrollToTop();

  return (
    <>
      <CartOverlay isVisible={isCartVisible} onClick={closeCart} />
      <nav className="desktop-nav">
        <div id="logo" onClick={handleLogoClick}>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/" onClick={scrollToTop}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Shop" onClick={scrollToTop}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/Contact" onClick={scrollToTop}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/About" onClick={scrollToTop}>
                About us
              </Link>
            </li>
            {currentUser ? (
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/Login" onClick={scrollToTop}>
                  Login
                </Link>
              </li>
            )}
            <li>
              <button className="nav-links__link cart-btn" onClick={openCart}>
                Cart
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {isCartVisible && (
        <Cart isCartVisible={isCartVisible} onClose={closeCart} />
      )}
    </>
  );
}
