import React from "react";
import "./pizzaSize.css";
import imgSmall from "../img/small.png";
import imgMedium from "../img/medium.png";
import imgLarge from "../img/large.png";
import PropTypes from "prop-types";

export const PizzaSize = ({ handleSizeChange, selectedSize }) => {
  return (
    <div className="pizzaSize-container">
      <div>
        <label className="size-label-styles">
          <div>
            <input
              type="radio"
              name="pizzaSize"
              value="8"
              checked={selectedSize === "8"}
              onChange={handleSizeChange}
            />
            Small
          </div>
          <img src={imgSmall} alt="small-pizza-size" />
        </label>
      </div>

      <div>
        <label className="size-label-styles">
          <div>
            <input
              type="radio"
              name="pizzaSize"
              value="10"
              checked={selectedSize === "10"}
              onChange={handleSizeChange}
            />
            Medium
          </div>
          <img src={imgMedium} alt="small-pizza-size" />
        </label>
      </div>

      <div>
        <label className="size-label-styles">
          <div>
            <input
              type="radio"
              name="pizzaSize"
              value="12"
              checked={selectedSize === "12"}
              onChange={handleSizeChange}
            />
            Large
          </div>
          <img src={imgLarge} alt="small-pizza-size" />
        </label>
      </div>
    </div>
  );
};

PizzaSize.propTypes = {
  handleSizeChange: PropTypes.func.isRequired,
  selectedSize: PropTypes.oneOf(["8", "10", "12"]).isRequired,
};
