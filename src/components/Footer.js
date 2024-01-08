import Socials from "./socials";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="shop-footer">
          <div>
            <div className="footer-socials">
              <h1>Let's keep in touch!</h1>
              <p>
                Find us on any of these platforms, we respond 1-2 business days.
              </p>
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
          <div></div>
        </div>

        {/* <div className="shop-footer">
          <div className="footer-a">
            <h1>INVITE MILK BAR TO YOUR B’DAY PARTY</h1>
            <p>
              Tell us your birthday + receive a special treat with your birthday
              order :)
            </p>
            <form className="footer-newsletter">
              <input type="text" placeholder="Your email" />
              <input type="text" placeholder="Your birthday" />
              <button>SUBMIT</button>
            </form>
            <div className="socials">
              <ion-icon name="logo-instagram"></ion-icon>
            </div>
          </div>
          <div className="footer-b"></div>
          <div className="footer-c"></div>
        </div> */}
      </footer>
    </>
  );
}
