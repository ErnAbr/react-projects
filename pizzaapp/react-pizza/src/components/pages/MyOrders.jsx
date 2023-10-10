import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./myOrders.css";

export const MyOrders = ({ userName }) => {
  const [myOrders, setMyOrders] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://pizzaorder-app-f4a5fc0b9f0a.herokuapp.com/api/orders/user_orders/${userName}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 404) {
            throw new Error(errorData.message);
          } else {
            throw new Error("Error fetching orders");
          }
        }

        const data = await response.json();
        setMyOrders(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [userName]);

  if (!userName) {
    return <div>please log in!</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (myOrders === null) {
    return <div>LOADING ORDERS...</div>;
  }

  const sizeLabels = {
    8: "Small",
    10: "Medium",
    12: "Large",
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `https://pizzaorder-app-f4a5fc0b9f0a.herokuapp.com/api/orders/user_orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete order");
      }

      alert(responseData.message);

      setMyOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  return (
    <div className="myOrders-container">
      <h1>My Orders</h1>

      {myOrders.map((order, index) => (
        <div className="myOrders-card" key={index}>
          <div>
            <p>
              Pizza Size: <b>{sizeLabels[order.size] || order.size}</b>
            </p>
            <p>
              Selected Toppings: <b>{order.toppings.join(", ")}</b>
            </p>
            <p>
              Total Price: <b>{order.totalPrice}$</b>
            </p>
          </div>
          <div className="button-wrapper">
            <button onClick={() => handleDelete(order._id)}>DELETE</button>
          </div>
        </div>
      ))}
    </div>
  );
};

MyOrders.propTypes = {
  userName: PropTypes.string,
};
