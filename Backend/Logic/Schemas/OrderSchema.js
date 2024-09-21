const mongoose = require("mongoose");
const MySchema = mongoose.Schema({
  orderId: String,
  userId: String,
  grandTotal: Number,
  billing_Address: {},
  products: [],
  status: {
    type: String,
    default: "coming",
  },
  date: String,
});
const OrderModel = mongoose.model("Orders", MySchema);
module.exports = OrderModel;
