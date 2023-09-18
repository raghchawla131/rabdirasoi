export default function Footer() {
  return (
    <>
      <footer>
        <div className="shop-footer">
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
        </div>
      </footer>
    </>
  );
}
