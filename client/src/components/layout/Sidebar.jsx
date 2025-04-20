import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import logo from "../../assets/rab di rasoi logo.png";
import { Drawer, IconButton } from "@mui/material"; // Import Drawer and IconButton
import { Close as CloseIcon } from "@mui/icons-material"; // Import MUI Close icon

export default function Sidebar({ toggleCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  // Function to toggle the sidebar drawer
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Navigation with Menu Button */}
      <nav className="mobile-nav">
        <div onClick={toggleMenu}>
          <ion-icon id="open-menu" name="menu-outline"></ion-icon>
        </div>
        <div>
          <img className="sidebar-navbar-logo" src={logo} alt="Logo" />
        </div>
        <div>
          <button onClick={toggleCart} className="sidebar-cart-btn">
            <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </nav>

      {/* Drawer for Sidebar Menu */}
      <Drawer
  open={isMenuOpen}
  onClose={toggleMenu}
  anchor="left"
  disableScrollLock={true}
  transitionDuration={300}
  sx={{
    "& .MuiDrawer-paper": {
      width: "250px",
      maxWidth: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
  }}
>
  {/* Container for Close Button and Links side by side */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10px",
    }}
  >
    {/* Sidebar Links */}
    <ul
      className="sidebar__list"
      style={{
        paddingTop: "10px",
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <li className="sidebar__item">
        <Link to="/" onClick={handleLinkClick} className="sidebar__link">
          Home
        </Link>
      </li>
      <li className="sidebar__item">
        <Link to="/Shop" onClick={handleLinkClick} className="sidebar__link">
          Shop
        </Link>
      </li>
      <li className="sidebar__item">
        <Link to="/Contact" onClick={handleLinkClick} className="sidebar__link">
          Contact us
        </Link>
      </li>
      <li className="sidebar__item">
        <Link to="/About" onClick={handleLinkClick} className="sidebar__link">
          About us
        </Link>
      </li>
      {currentUser ? (
        <li className="sidebar__item">
          <Link onClick={logout} className="sidebar__link">
            Logout
          </Link>
        </li>
      ) : (
        <li className="sidebar__item">
          <Link to="/Login" onClick={handleLinkClick} className="sidebar__link">
            Login
          </Link>
        </li>
      )}
    </ul>

    {/* Close Button */}
    <IconButton
      onClick={toggleMenu}
      sx={{
        backgroundColor: "#fff",
        padding: "5px",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </div>
</Drawer>


    </div>
  );
}
