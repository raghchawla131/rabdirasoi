import logo from "../assets/rab di rasoi logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
/*   const [menuClick, setMenuClick] = useState(false);

  function handleClick() {
    setMenuClick(!menuClick);
  } */

  return (
    <>
      <nav className="desktop-nav">
        <div id="logo">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
            <li>
              <Link to="/Contact">Contact us</Link>
            </li>
            <li>
              <Link to="/About">About us</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
