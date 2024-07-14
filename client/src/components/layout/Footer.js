import { Link } from "react-router-dom"
import Socials from "../socials"
import "./Footer.css"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <footer>
        <div className="shop-footer">
          <div className="footer-socials">
            <h1>Let's keep in touch!</h1>
            <p>
              Find us on any of these platforms, we respond 1-2 business days.
            </p>
            <section className="footer-socials-section">
              <Socials icon={<ion-icon name="logo-instagram"></ion-icon>} />
              <Socials icon={<ion-icon name="logo-whatsapp"></ion-icon>} />
              <Socials icon={<ion-icon name="call-outline"></ion-icon>} />
            </section>
          </div>
          <div className="footer-page-links">
            <div>
              <table className="table-1">
                <thead>
                  <tr>
                    <th>USEFUL LINKS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to="/Shop" onClick={scrollToTop}>
                        Shop
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/Contact" onClick={scrollToTop}>
                        Contact
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/About" onClick={scrollToTop}>
                        About
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="table-2">
                <thead>
                  <tr>
                    <th>OTHER RESOURCES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="https://github.com/raghchawla131/rabdirasoi">
                        GitHub
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Gallery</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
