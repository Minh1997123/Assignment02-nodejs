import "./Header.css";
import HeaderForm from "./HeaderForm";
import { Link } from "react-router";
const Header = function () {
  return (
    <header className="header">
      <h1>A lifetime of discounts? It's Genius</h1>
      <p>
        Get rewarded for your travels - unlock instant savings of 10% or more
        witch a free account
      </p>
      <Link to="/login">
        <button>Sign in / Register</button>
      </Link>
      <HeaderForm></HeaderForm>
    </header>
  );
};
export default Header;
