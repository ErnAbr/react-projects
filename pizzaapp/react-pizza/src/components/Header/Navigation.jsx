import { NavLink } from "react-router-dom";
import "./header.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Navigation = ({ userName }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  const handleHamburger = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleNavLinkClick = () => {
    setIsActive(false);
  };

  return (
    <nav className="nav">
      <ul className={`ul-navigation ${isActive ? "active" : ""}`}>
        <li onClick={handleNavLinkClick}>
          <NavLink to="/">Home</NavLink>
        </li>

        {userName && (
          <>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/order">Orders</NavLink>
            </li>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/my_orders">My Orders</NavLink>
            </li>
          </>
        )}
      </ul>
      <div
        onClick={handleHamburger}
        className={`hamburger ${isActive ? "active" : ""}`}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  userName: PropTypes.string,
};
