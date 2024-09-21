const mongoose = require("mongoose");
const MySchema = mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  category: String,
  audience: String,
  rating: Number,
  ImagePath: String,
  stock: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  description: String,
});
const ProductModel = mongoose.model("Product", MySchema);
module.exports = ProductModel;
