const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  toppings: {
    type: [String],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("orders", PizzaSchema);
