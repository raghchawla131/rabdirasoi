import logo from "../assets/rab di rasoi logo.png";

export default function Sidebar() {
  return (
    <>
      <nav className="sidebar-nav">
        <div>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div>
          <img className="sidebar-logo" src={logo} alt="" />
        </div>
        <div>
          <ion-icon name="cart-outline"></ion-icon>
        </div>
      </nav>
    </>
  );
}
