import { Navigation } from "./Navigation";
import "./header.css";
import logo from "../img/logo.png";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const Header = ({ userName }) => {
  return (
    <header className="header">
      <div className="nav-logo">
        <NavLink to="/">
          <img src={logo} alt="PIZZA-LOGO" />
        </NavLink>
      </div>
      <Navigation userName={userName} />
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
};
