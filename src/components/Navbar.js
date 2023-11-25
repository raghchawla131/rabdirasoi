import { Link } from "react-router-dom";
import "../App.css";
import Cart from "./Cart";
import logo from "../assets/rab di rasoi logo.png";

export default function Navbar({
  isCartVisible,
  setIsCartVisible,
  toggleCart,
}) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isCartVisible && (
        <div className="overlay" onClick={() => setIsCartVisible(false)}></div>
      )}
      <nav className="desktop-nav">
        <div id="logo">
          <img className="logo" src={logo} alt="" />
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
            <li>
              <Link to="/Login" onClick={scrollToTop}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/Cart" onClick={toggleCart}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {isCartVisible && (
        <Cart
          setIsCartVisible={setIsCartVisible}
          isCartVisible={isCartVisible}
          toggleCart={toggleCart}
          onClose={() => setIsCartVisible(false)}
        />
      )}
    </>
  );
}
