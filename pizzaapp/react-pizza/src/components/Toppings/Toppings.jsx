import "./toppings.css";
import PropTypes from "prop-types";

export const Toppings = ({
  toppings,
  selectedToppings,
  handleToppingChange,
}) => {
  return (
    <>
      {toppings.map((topping) => (
        <label className="topping-label-styles" key={topping}>
          <input
            type="checkbox"
            value={topping}
            checked={selectedToppings.includes(topping)}
            onChange={handleToppingChange}
          />
          {topping}
        </label>
      ))}
    </>
  );
};

Toppings.propTypes = {
  toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedToppings: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleToppingChange: PropTypes.func.isRequired,
};
