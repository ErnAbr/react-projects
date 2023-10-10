const express = require("express");
const router = express.Router();
const Order = require("../models/pizzaOrder.js");

router.post("/calculate", async (req, res) => {
  try {
    const orderData = req.body;

    const toppingPrice = orderData.toppings.length;
    let totalPrice = Number(orderData.size) + toppingPrice;

    if (orderData.toppings.length >= 4) {
      totalPrice *= 0.9;
    }

    return res.status(200).send({ price: totalPrice });
  } catch (error) {
    return res.status(500).send({ message: "cannot calculate pizza price" });
  }
});

router.get("/user_orders/:user_id", async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.user_id });

    if (orders.length === 0) {
      return res.status(404).send({ message: "no orders found" });
    }

    return res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.delete("/user_orders/:_id", async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params._id,
    });

    if (!order) {
      return res.status(400).send({ message: "order not found" });
    }

    await order.deleteOne();
    res.status(200).send({ message: "Order successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/set", async (req, res) => {
  try {
    const newPizza = new Order(req.body);
    await newPizza.save();
    return res.status(200).send({ message: "order accepted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "order declined" });
  }
});

router.get("/toppings", async (req, res) => {
  try {
    const toppings = [
      "Marinara sauce",
      "Chicken breast",
      "Green peppers",
      "Black olives",
      "Spinach",
      "Mushrooms",
      "Onions",
      "Tomato",
    ];
    return res.status(200).send(toppings);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
