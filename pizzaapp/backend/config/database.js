const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ernabr:*****@cluster0.oeaasd3.mongodb.net/pizza_app?retryWrites=true&w=majority"
    );
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
