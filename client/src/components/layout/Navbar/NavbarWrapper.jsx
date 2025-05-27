import { useEffect, useState, useContext } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { AuthContext } from "../../../context/authContext";

export default function NavbarWrapper() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const { logout } = useContext(AuthContext);

  // Explicit open and close cart
  const openCart = () => setIsCartVisible(true);
  const closeCart = () => setIsCartVisible(false);

  // const handleLogout = () => {
  //   logout(); // ← actual logout logic from context
  //   const event = new CustomEvent("logoutUser"); // optionally notify other tabs/components
  //   window.dispatchEvent(event);
  // };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isCartVisible ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isCartVisible]);

  return isMobile ? (
    <MobileNavbar
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      isCartVisible={isCartVisible}
      openCart={openCart}
      closeCart={closeCart}
      // handleLogout={handleLogout}
    />
  ) : (
    <DesktopNavbar
      isCartVisible={isCartVisible}
      openCart={openCart}
      closeCart={closeCart}
      // handleLogout={handleLogout}
    />
  );
}
