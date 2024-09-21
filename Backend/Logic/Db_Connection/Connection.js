const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Demo_Shopping")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error while connecting the database");
  });
