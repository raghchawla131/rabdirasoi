import { Link } from "react-router-dom";
import {
  useUser,
  SignedIn,
  SignedOut,
  ClerkProvider,
  UserButton,
  SignInButton,
} from "@clerk/react-router";
import Cart from "../../Cart/Cart";
import logo from "../../../assets/rab di rasoi logo.png";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import "./DesktopNavbar.css";
import { ShoppingCart } from "lucide-react";

export default function DesktopNavbar({
  isCartVisible,
  openCart,
  closeCart,
  // Remove handleLogout; Clerk provides logout via UserButton
}) {
  // const { isSignedIn } = useUser();

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
                <SignInButton />
              </li>
            </SignedOut>

            <SignedIn>
              <li>
                {/* UserButton shows user avatar and provides sign out, account management UI */}
                <UserButton />
              </li>
            </SignedIn>

            <li>
              {/* <button className="nav-links__link cart-btn" onClick={openCart}>
                Cart
              </button> */}
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
