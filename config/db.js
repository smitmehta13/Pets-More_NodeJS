const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const database = process.env.MONGO_DATABASE;
const urlDataBase = process.env.MONGO_SERVER;

// get default connection
const db = mongoose.connection;

const connectDB = () => {
  // setup default mongoose connection
  mongoose.connect(`mongodb://${urlDataBase}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // notifies when the connection is open
  db.on("connected", function () {
    console.log(
      "Mongoose default connection is open to ",
      `mongodb://${urlDataBase}/${database}`
    );
  });
  // Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

module.exports = connectDB;
