import { PizzaSize } from "../PizzaSize/PizzaSize";
import { Toppings } from "../Toppings/Toppings";
import PropTypes from "prop-types";
import "./orders.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Orders = ({ userName }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(0);
  const [toppings, setToppings] = useState([]);

  const navigate = useNavigate();

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedToppings.length >= 6) {
        alert("You can only select up to 6 toppings.");
      } else {
        setSelectedToppings((prevToppings) => [...prevToppings, value]);
      }
    } else {
      setSelectedToppings((prevToppings) =>
        prevToppings.filter((topping) => topping !== value)
      );
    }
  };

  const calculatePrice = useCallback(async () => {
    const orderData = {
      size: selectedSize,
      toppings: selectedToppings,
    };

    try {
      const response = await fetch(
        "https://pizzaorder-app-f4a5fc0b9f0a.herokuapp.com/api/orders/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      setPrice(data.price);
    } catch (error) {
      console.error("Error fetching the price:", error);
    }
  }, [selectedSize, selectedToppings]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://pizzaorder-app-f4a5fc0b9f0a.herokuapp.com/api/orders/toppings"
        );
        const data = await response.json();
        setToppings(data);
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        user_id: localStorage.getItem("userName"),
        size: selectedSize,
        toppings: selectedToppings,
        totalPrice: price.toFixed(2),
      };
      const response = await fetch(
        "https://pizzaorder-app-f4a5fc0b9f0a.herokuapp.com/api/orders/set",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const answer = await response.json();
      alert(answer.message);
      navigate("/my_orders");
    } catch (error) {
      console.error(error);
    }
  };

  if (!userName) {
    return <div>please log in!</div>;
  }

  return (
    <div className="order-container">
      <h1>Order Your Pizza</h1>
      <form className="form-positionting" onSubmit={handleSubmit}>
        <h2>Select Size:</h2>
        <div className="pizza-size-container">
          <PizzaSize
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />
        </div>
        <h2>Select Toppings:</h2>
        <p className="discount-para">
          Select More then 3 Toppings and get -10% discount
        </p>
        <div className="toppings-styles">
          <Toppings
            handleToppingChange={handleToppingChange}
            toppings={toppings}
            selectedToppings={selectedToppings}
          />
        </div>
        <div className="btn-positioning">
          <p>Total Price: ${price.toFixed(2)}</p>
          <button type="submit" disabled={!selectedSize}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

Orders.propTypes = {
  userName: PropTypes.string.isRequired,
};
