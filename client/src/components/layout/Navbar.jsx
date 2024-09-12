import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import Cart from "../Cart/Cart";
import logo from "../../assets/rab di rasoi logo.png";
import "./Navbar.css";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800); //to check weather to display sidebar or navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // window.location.reload();
    } else {
      navigate("/");
    }
  };

  // Function to handle window resize
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 800);
  };

  // Effect to add and remove event listener for window resize
  useEffect(() => {
    handleWindowSizeChange(); // Set initial state

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle link click
  const handleLinkClick = () => {
    scrollToTop();
    closeMenu();
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Ref for handling click outside
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // Toggle cart visibility
  const toggleCart = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsCartVisible(!isCartVisible);
  };

  // Effect to manage body overflow when cart is open
  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isCartVisible]);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Render based on isMobile
  if (isMobile) {
    return (
      <>
        {isCartVisible && (
          <div
            className="overlayCart"
            onClick={() => setIsCartVisible(false)}
          ></div>
        )}
        <nav className="mobile-nav">
          <div onClick={toggleMenu}>
            <ion-icon id="open-menu" name="menu-outline"></ion-icon>
          </div>
          <div>
            <img className="sidebar-navbar-logo" src={logo} alt="" />
          </div>
          <div>
            <Link to="/Cart" onClick={toggleCart}>
              <ion-icon name="cart-outline"></ion-icon>
            </Link>
          </div>
        </nav>
        <div
          ref={ref}
          className={`sidebar ${isMenuOpen ? "sidebar--show" : ""}`}
        >
          <div className="sidebar__header">
            <div onClick={toggleMenu} className="sidebar__toggle">
              <ion-icon id="close-menu" name="close-outline"></ion-icon>
            </div>
            <img className="sidebar__logo" src={logo} alt="" />
          </div>
          <div className="sidebar__links">
            <ul className="sidebar__list">
              <li className="sidebar__item">
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="sidebar__link"
                >
                  Home
                </Link>
              </li>
              <li className="sidebar__item">
                <Link
                  to="/Shop"
                  onClick={handleLinkClick}
                  className="sidebar__link"
                >
                  Shop
                </Link>
              </li>
              <li className="sidebar__item">
                <Link
                  to="/Contact"
                  onClick={handleLinkClick}
                  className="sidebar__link"
                >
                  Contact us
                </Link>
              </li>
              <li className="sidebar__item">
                <Link
                  to="/About"
                  onClick={handleLinkClick}
                  className="sidebar__link"
                >
                  About us
                </Link>
              </li>
              {currentUser ? (
                <li className="sidebar__item">
                  <Link onClick={handleLogout} className="sidebar__link">
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="sidebar__item">
                  <Link
                    to="/Login"
                    onClick={handleLinkClick}
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
          <Cart
            isCartVisible={isCartVisible}
            setIsCartVisible={setIsCartVisible}
            toggleCart={toggleCart}
            onClose={() => setIsCartVisible(false)}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {isCartVisible && (
          <div
            className="overlayCart"
            onClick={() => setIsCartVisible(false)}
          ></div>
        )}
        <nav className="desktop-nav">
          <div id="logo" onClick={handleLogoClick}>
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
}
