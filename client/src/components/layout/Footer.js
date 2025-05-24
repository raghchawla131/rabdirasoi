import { Link } from "react-router-dom";
import Socials from "../socials";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-socials">
          <h2 className="footer-title">Stay Connected</h2>
          <div className="footer-icons">
            <Socials icon={<ion-icon name="logo-instagram"></ion-icon>} />
            <Socials icon={<ion-icon name="logo-whatsapp"></ion-icon>} />
          </div>
        </div>
        <div className="footer-links">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-nav">
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/shop" onClick={scrollToTop}>Shop</Link></li>
            <li><Link to="/gallery" onClick={scrollToTop}>Gallery</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Rab Di Rasoi. All rights reserved.</p>
      </div>
    </footer>
  );
}
