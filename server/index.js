const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Connection failed and error occured", error);
  });

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});

app.use(express.json());
