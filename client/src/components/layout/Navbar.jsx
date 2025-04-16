import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import logo from "../../assets/rab di rasoi logo.png";
import { AuthContext } from "../../context/authContext";
import Sidebar from "./Sidebar";
import Cart from "../Cart/Cart";
import { Drawer, IconButton } from "@mui/material"; // Import MUI components
import { Close as CloseIcon } from "@mui/icons-material"; // Import MUI Close icon
import "./Navbar.css";

export default function Navbar() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const { currentUser, logout } = useContext(AuthContext);
  const [cartDrawerWidth, setCartDrawerWidth] = useState("400px"); // default for desktop

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // Function to handle window resize
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 800);
  };

  useEffect(() => {
    handleWindowSizeChange(); // Set initial state
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const toggleCart = (e, width = "400px") => {
    if (e) e.preventDefault();
    setCartDrawerWidth(width);
    setIsCartVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = "hidden"; // Prevent scroll when cart is open
    } else {
      document.body.style.overflow = "visible"; // Allow scroll when cart is closed
    }
    return () => {
      document.body.style.overflow = "visible"; // Ensure scroll is allowed after unmount
    };
  }, [isCartVisible]);

  return (
    <>
      {isMobile ? (
        <Sidebar toggleCart={toggleCart} />
      ) : (
        <nav className="desktop-nav">
          <div id="logo" onClick={handleLogoClick}>
            <img className="logo" src={logo} alt="Logo" />
          </div>
          <div className="nav-links">
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
              {currentUser ? (
                <li>
                  <Link onClick={logout}>Logout</Link>
                </li>
              ) : (
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              )}
              <li>
                {/* Toggle Cart visibility */}
                <a href="#" onClick={toggleCart}>
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {/* MUI Drawer for Cart */}
      <Drawer
        open={isCartVisible}
        onClose={toggleCart}
        anchor="right"
        disableScrollLock={true}
        transitionDuration={300}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "300px" : "400px", // Adjust width based on screen size
            maxWidth: "100%",
          },
        }}
      >
        {/* Cart Close Button */}
        <IconButton
          onClick={toggleCart}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Cart Content */}
        <Cart
          setIsCartVisible={setIsCartVisible}
          isCartVisible={isCartVisible}
          toggleCart={toggleCart}
          onClose={() => setIsCartVisible(false)}
        />
      </Drawer>
    </>
  );
}
