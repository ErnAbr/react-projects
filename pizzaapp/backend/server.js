const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/database.js");

connectDb();

const server = express();
const orderController = require("./controllers/orderController.js");

server.use(express.json());
server.use(cors());

server.use("/api/orders", orderController);
server.use(express.static(path.join(__dirname, "../react-pizza/build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-pizza/build/index.html"));
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
