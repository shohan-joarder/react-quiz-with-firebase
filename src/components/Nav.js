import { Link } from "react-router-dom";
import Logo from "../assets/login.svg";
import classes from "./../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={Logo} alt="Learn with Sumit Logo" />
            <h3>SHOHAN</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
