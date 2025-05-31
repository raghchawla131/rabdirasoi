import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import Cart from "../../Cart/Cart";
import logo from "../../../assets/rab di rasoi logo.png";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import "./DesktopNavbar.css";
import { ShoppingCart } from "lucide-react";

export default function DesktopNavbar({ isCartVisible, openCart, closeCart }) {
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

            {/* Clerk Auth Check */}
            <SignedOut>
              <li>
                <SignInButton mode="modal">
      <button className="sign-in-btn">Sign In</button>
    </SignInButton>
              </li>
            </SignedOut>

            <SignedIn>
              <li>
                <UserButton />
              </li>
            </SignedIn>

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
