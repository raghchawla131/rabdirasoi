import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import Cart from "../Cart"
import logo from "../../assets/rab di rasoi logo.png"
import "./Navbar.css"

export default function Navbar() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <img className="sidebar-logo" src={logo} alt="" />
          </div>
          <div>
            <Link to="/Cart" onClick={toggleCart}>
              <ion-icon name="cart-outline"></ion-icon>
            </Link>
          </div>
        </nav>
        <div
          ref={ref}
          className={`sidebar ${isMenuOpen ? "sidebar-show" : ""}`}
        >
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
}
