import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./home.css";

export const Home = ({ setUserName }) => {
  const [inputValue, setInputValue] = useState("");
  const [isStored, setIsStored] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setIsStored(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatterUserName = inputValue.trim().toLowerCase();
    setUserName(formatterUserName);
    localStorage.setItem("userName", formatterUserName);
    setIsStored(true);
    setInputValue("");
    navigate("/order");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    setIsStored(false);
  };

  return (
    <div className="name-container">
      <h1 className="home-greetings">
        {!isStored && "Enter Your Name"}
        {isStored && "You Already Logged In"}
      </h1>

      <form className="form-styles" onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit" disabled={isStored || !inputValue.trim()}>
          Enter
        </button>
        <button disabled={!isStored} onClick={handleLogout}>
          Log Out
        </button>
      </form>
    </div>
  );
};

Home.propTypes = {
  setUserName: PropTypes.func.isRequired,
};
