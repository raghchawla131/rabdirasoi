import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import logo from "../../../assets/rab di rasoi logo.png";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import "./DesktopNavbar.css";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../../../context/authContext";
import { Button } from "@mui/material";

export default function DesktopNavbar({ isCartVisible, openCart, closeCart }) {
  const handleLogoClick = useLogoClick();

  const scrollToTop = useScrollToTop();

  const navigate = useNavigate();

  const { currentUser, signOut } = useContext(authContext);

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
              <Link to="/gallery" onClick={scrollToTop}>
                Gallery
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
      {!currentUser ? (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/signin')}
          sx={{
            backgroundColor: 'deeppink',
            color: 'white',
            '&:hover': {
              backgroundColor: '#c71585',
            },
          }}
        >
          Sign In
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={() => signOut()}
          sx={{
            backgroundColor: 'deeppink',
            color: 'white',
            '&:hover': {
              backgroundColor: '#c71585',
            },
          }}
        >
          Sign Out
        </Button>
      )}
    </li>

            <li>
              <ShoppingCart onClick={openCart} />
              {""}
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
