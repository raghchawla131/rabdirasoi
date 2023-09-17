import logo from "../assets/rab di rasoi logo.png"

export default function Navbar() {
  return (
    <>
      <header>
        <img className="logo" src={logo} alt="" />
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span>
            <ion-icon name="menu-outline"></ion-icon>
          </span>
        </label>
        <nav>
          <ul>
            <li>
              <a href="i">Home</a>
            </li>
            <li>
              <a href="j">About us</a>
            </li>
            <li>
              <a href="l">Contact us</a>
            </li>
            <li>
              <a href="h">Shop</a>
            </li>
          </ul>
        </nav>
        <hr />
      </header>
    </>
  );
}
