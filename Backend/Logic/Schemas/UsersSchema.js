const mongoose = require("mongoose");
const MySchema = mongoose.Schema({
  userId: String,
  userName: String,
  age: Number,
  email: String,
  gender: String,
  password: String,
  userImagePath: String,
  address: {},
  noOfProdsInCart: {
    type: Number,
    default: 0,
  },
  noOfProdsInWishList: {
    type: Number,
    default: 0,
  },
  cart: [{}],
  wishList: [{}],
});
const UserModel = mongoose.model("User", MySchema);
module.exports = UserModel;
