export default function Navbar() {
  return (
    <>
      <header>
        <h1 className="logo">Logo</h1>
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
      </header>
    </>
  );
}
