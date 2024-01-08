import Socials from "./socials";

export default function Footer() {
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
                    <td>About Us</td>
                  </tr>
                  <tr>
                    <td>Blog</td>
                  </tr>
                  <tr>
                    <td>Github</td>
                  </tr>
                  <tr>
                    <td>Free Products</td>
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
                    <td>About Us</td>
                  </tr>
                  <tr>
                    <td>Blog</td>
                  </tr>
                  <tr>
                    <td>Github</td>
                  </tr>
                  <tr>
                    <td>Free Products</td>
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
