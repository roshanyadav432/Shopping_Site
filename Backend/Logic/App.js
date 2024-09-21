const express = require("express");
require("./Db_Connection/Connection");
const ProductModel = require("./Schemas/ProductSchema");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./Schemas/UsersSchema");
const OrderModel = require("./Schemas/OrderSchema");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// secret key:
const secret_key = "Dost_ye_mera_secret_key_hai_check_karna_isse_hi";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/"); //Specify the directory where files will be stored)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("hello from backend!!");
});

//handling register:
app.post("/register", upload.single("file"), async (req, res) => {
  try {
    const { userName, age, email, gender, password } = req.body;
    //console.log(userName, age, email, gender, password);
    const userImagePath = req.file.path;
    //   console.log(userImagePath);
    const Data = await UserModel.findOne({ email });
    if (Data) {
      res.status(400).send("Email Already Present");
    } else {
      const Data = await new UserModel({
        userId: uuidv4(),
        userName,
        age,
        email,
        gender,
        password,
        userImagePath,
      });
      await Data.save();
      res.status(200).send("Registered successfully!!");
    }
  } catch (error) {
    res
      .status(400)
      .send("some error occured while registwration please try again!!");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "admin@gmail.com" && password == "pass") {
      const token = jwt.sign(
        { userId: "admin", userName: "admin", email: "admin@gmail.com" },
        secret_key
      );
      res.cookie("Token", token);
      res.status(200).send({ message: "login Successfully", isAdmin: true });
    } else {
      const Data = await UserModel.findOne({ email });
      console.log(Data);
      if (Data) {
        if (Data.password == password) {
          const token = jwt.sign(
            {
              userId: Data.userId,
              userName: Data.userName,
              email: Data.email,
            },
            secret_key
          );
          res.cookie("Token", token);
          res.status(200).send({
            message: "login Successfully",
            isAdmin: false,
          });
        } else {
          res.status(400).send("wrong email or password!!");
        }
      } else {
        res.status(400).send("No User Present!!");
      }
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//handle ForgetPass:
app.post("/forget", async (req, res) => {
  try {
    const { email, newPass } = req.body;
    const Data = await UserModel.findOne({ email });
    if (Data) {
      Data.password = newPass;
      await Data.save();
      res.status(200).send("Updated Successfully!!");
    } else {
      res.status(400).send("invalid Email Id");
    }
  } catch (error) {
    res.status(400).send("Some error occured!!");
  }
});

//handle AddProduct:
app.post("/AddProduct", upload.single("file"), async (req, res) => {
  try {
    const { name, price, audience, category, stock, rating, description } =
      req.body;
    const ImagePath = req.file.path;
    const Data = await new ProductModel({
      productId: uuidv4(),
      name: name.toLowerCase(),
      price,
      category,
      audience,
      rating,
      ImagePath,
      stock,
      description,
    });
    await Data.save();
    res.status(200).send("Product Added Successfully!!");
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.get("/getAllProducts", async (req, res) => {
  try {
    const Data = await ProductModel.find({});
    if (Data) {
      res.status(200).send(Data);
    } else {
      res.status(400).send("No Products are Present");
    }
  } catch (error) {
    res.status(400).send("some error occured");
  }
});
//AddTowishList:
app.post("/AddTowishList", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    const { productId } = req.body;
    console.log(productId);
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      // console.log(verification);
      const email = verification.email;
      const UserData = await UserModel.findOne({ email });
      const newArray = UserData.wishList.find((prod) => {
        return prod.productId == productId;
      });
      if (newArray) {
        res.status(400).send("This Item is already is in your Cart");
      } else {
        const ProdData = await ProductModel.findOne({ productId });
        UserData.wishList.push({
          productId: ProdData.productId,
          name: ProdData.name,
          price: ProdData.price,
          rating: ProdData.rating,
          ImagePath: ProdData.ImagePath,
          description: ProdData.description,
          quantity: 1,
        });
        UserData.noOfProdsInWishList += 1;
        await UserData.save();
        res.status(200).send("Product Added successfully!!");
      }
    } else {
      res.status(400).send("Login First!!");
    }
  } catch (error) {
    res.status(400).send("some error occured");
  }
});
//handleGetAll Products of WishLists:
app.get("/getAllWishListProd", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        res.status(200).send(Data);
      }
    } else {
      res.status(400).send("Login First To See WishList");
    }
  } catch (error) {
    res.status(400).send("some error occured !!");
  }
});

app.delete("/handleWishListItemRemove/:productId", async (req, res) => {
  try {
    productId = req.params.productId;
    console.log(productId);
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      const newArray = Data.wishList.filter((prod) => {
        return prod.productId !== productId;
      });
      Data.wishList = newArray;
      Data.noOfProdsInWishList -= 1;
      await Data.save();
      res.status(200).send("Item Removed!!");
    } else {
      res.status(400).send("Login first to remove");
    }
  } catch (error) {
    res.status(400).send("Some error occured!!");
  }
});

// handleAddToCart
app.post("/handleAddToCart", async (req, res) => {
  const { productId } = req.body;
  const Token = req.cookies.Token;
  if (Token) {
    const verification = jwt.verify(Token, secret_key);
    const userId = verification.userId;
    const Data = await UserModel.findOne({ userId });
    const isProdPresent = Data.cart.find((prod) => {
      return prod.productId == productId;
    });
    if (isProdPresent) {
      console.log("Item already present ");
      const newArray = Data.cart.map((prod) => {
        if (prod.productId == productId) {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        }
        return prod;
      });
      // console.log(newArray, "newArray");
      Data.cart = newArray;
    } else {
      const Prod = await ProductModel.findOne({ productId });
      Data.cart.push({
        productId: Prod.productId,
        name: Prod.name,
        price: Prod.price,
        rating: Prod.rating,
        ImagePath: Prod.ImagePath,
        description: Prod.description,
        quantity: 1,
      });
      Data.noOfProdsInCart += 1;
    }
    //code that both condition runs :

    //after adding the product delete the product from the wishList:
    const isItemInWishList = Data.wishList.find((prod) => {
      return prod.productId == productId;
    });
    if (isItemInWishList) {
      const newWishList = Data.wishList.filter((prop) => {
        return prop.productId !== productId;
      });
      Data.wishList = newWishList;
      Data.noOfProdsInWishList -= 1;
    }
    await Data.save();
    res.status(200).send("Product Added in the cart");
  } else {
    res.status(400).send("Login first!!");
  }
});

//get All cart item:
app.get("/cart", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        res.status(200).send(Data);
      }
    } else {
      res.status(400).send("Login First!!");
    }
  } catch (error) {
    res.status(400).send("Some error occured!!");
  }
});

//Minus the quantity:
app.post("/minusQuantity", async (req, res) => {
  try {
    const { productId } = req.body;
    const Token = req.cookies.Token;

    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        const newCart = Data.cart.map((item) => {
          if (item.productId == productId) {
            if (item.quantity == 1) {
              return item;
            } else {
              return { ...item, quantity: item.quantity - 1 };
            }
          } else {
            return item;
          }
        });
        Data.cart = newCart;
        await Data.save();
        res.status(200).send("Minimized!!");
      } else {
        res.status(400).send("No User Present");
      }
    } else {
      res.status(400).send("Login First");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//Increase the quantity:
app.post("/plusQuantity", async (req, res) => {
  try {
    const { productId } = req.body;
    const Token = req.cookies.Token;

    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        const newCart = Data.cart.map((item) => {
          if (item.productId == productId) {
            if (item.quantity == 5) {
              return item;
            } else {
              return { ...item, quantity: item.quantity + 1 };
            }
          } else {
            return item;
          }
        });
        Data.cart = newCart;
        await Data.save();
        res.status(200).send("maximized!!");
      } else {
        res.status(400).send("No User Present");
      }
    } else {
      res.status(400).send("Login First");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//removing Item from cart:
app.delete("/removeItemFromCart/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        const newCart = Data.cart.filter((item) => {
          return item.productId !== productId;
        });
        Data.cart = newCart;
        Data.noOfProdsInCart -= 1;
        await Data.save();
        res.status(200).send("removed");
      } else {
        res.status(400).send("No Data is present");
      }
    } else {
      res.status(400).send("Login first!!");
    }
  } catch (error) {}
});

//handling Search Product Functionality:
app.get("/search", async (req, res) => {
  try {
    const name = req.query.name;
    const data = name.toLocaleLowerCase();
    const Data = await ProductModel.find();
    const newData = Data.filter((item) => {
      return item.name.includes(data);
    });
    if (newData.length > 0) {
      res.status(200).send(newData);
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//handling price Filter:
app.post("/filterPrice/:priceValue", async (req, res) => {
  try {
    const priceValue = req.params.priceValue;
    const { selectedCategory } = req.body;
    const category = selectedCategory;
    console.log(selectedCategory);
    let Data;
    if (!category) {
      const Data1 = await ProductModel.find();
      Data = Data1;
    } else {
      const Data2 = await ProductModel.find({ category });
      Data = Data2;
    }
    switch (priceValue) {
      case `Low To High`:
        const newData1 = Data.sort((a, b) => {
          return a.price - b.price;
        });
        res.status(200).send(newData1);
        break;

      case `High To Low`:
        const newData2 = Data.sort((a, b) => {
          return b.price - a.price;
        });
        res.status(200).send(newData2);
        break;

      default:
        res.status(200).send(Data);
        break;
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//handle Rating Filter:
app.post("/filterRating/:ratingValue", async (req, res) => {
  try {
    const ratingValue = req.params.ratingValue;
    const { selectedCategory } = req.body;
    const category = selectedCategory;
    let Data;
    if (!category) {
      const Data1 = await ProductModel.find({});
      Data = Data1;
    } else {
      const Data2 = await ProductModel.find({ category });
      Data = Data2;
    }
    switch (ratingValue) {
      case `Low To High`:
        const newData1 = Data.sort((a, b) => {
          return a.rating - b.rating;
        });
        res.status(200).send(newData1);
        break;

      case `High To Low`:
        const newData2 = Data.sort((a, b) => {
          return b.rating - a.rating;
        });
        res.status(200).send(newData2);
        break;

      default:
        res.status(200).send(Data);
        break;
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

//handle Address:
app.post("/address", async (req, res) => {
  try {
    const Address = req.body;
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const Data = await UserModel.findOne({ userId });
      if (Data) {
        Data.address = Address;
        if (Data.noOfProdsInCart <= 0) {
          await Data.save();
          res.status(200).send({ msg: "stop" });
        } else {
          await Data.save();
          res.status(200).send({ msg: "proceed" });
        }
      } else {
        res.status(400).send("No User Found");
      }
    } else {
      res.status(400).send("Login First");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.get("/payment", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      let grandTotal = 0;
      const Data = await UserModel.findOne({ userId });
      // console.log(Data.address);
      if (Data.address) {
        Data.cart.map((item) => {
          grandTotal += item.quantity * item.price;
        });
        if (Data.noOfProdsInCart == 0) {
          res.status(400).send("First Add products in cart!!");
        } else {
          res.status(200).send(`${grandTotal}`);
        }
      } else {
        res.status(400).send("first fill the address");
      }
    } else {
      res.status(400).send("Login First!!");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.post("/order", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const { grandTotal } = req.body;
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      const UesrData = await UserModel.findOne({ userId });

      const Order = await new OrderModel({
        orderId: uuidv4(),
        userId,
        grandTotal,
        billing_Address: UesrData.address,
        products: UesrData.cart,
        orderDate: Date(),
      });
      await Order.save();
      UesrData.cart = [];
      UesrData.noOfProdsInCart = 0;
      await UesrData.save();
      res.status(200).send(` Your order has been placed `);
    } else {
      res.status(400).send("Login first");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.get("/MyOrders", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      //console.log(userId);
      const Data = await OrderModel.find({ userId });
      //console.log(Data);
      if (Data.length > 0) {
        res.status(200).send(Data);
      } else {
        res.status(400).send("you have not ordered any product");
      }
    } else {
      res.status(400).send("Login first to see orders");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.get("/getAllOrders", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      if (userId == "admin") {
        const Data = await OrderModel.find({});
        res.status(200).send(Data);
      } else {
        res.status(400).send("You Are not authorized to manage Orders");
      }
    } else {
      res.status(400).send("Login First To manage Orders");
    }
  } catch (error) {
    res.status(400).send("some error occured");
  }
});

app.post("/handleStatus/:orderId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      if (userId == "admin") {
        const { status } = req.body;
        const orderId = req.params.orderId;
        console.log(status);
        console.log(orderId);
        const Data = await OrderModel.findOne({ orderId });
        Data.status = status;
        await Data.save();
        res.status(200).send("Updated Successfully!!");
      } else {
        res.status(400).send("you are not authorized to change the status");
      }
    } else {
      res.status(400).send("Login First To Update status");
    }
  } catch (error) {
    res.status(400).send("some error occured!!");
  }
});

app.put("/updatePrice/:productId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      if (userId == "admin") {
        const { price } = req.body;
        const productId = req.params.productId;
        console.log(price, productId);
        const Data = await ProductModel.findOne({ productId });
        Data.price = price;
        await Data.save();
        res.status(200).send("Price Updated");
      } else {
        res.status(400).send("You are not authorized to update the data");
      }
    } else {
      res.status(400).send("Login first to Update the price");
    }
  } catch (error) {
    res.status(400).send(`some error occured!!`);
  }
});

app.put("/updateStock/:productId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      if (userId == "admin") {
        const { stock } = req.body;
        const productId = req.params.productId;
        const Data = await ProductModel.findOne({ productId });
        Data.stock = stock;
        await Data.save();
        res.status(200).send("stock Updated");
      } else {
        res.status(400).send("You are not authorized to update the data");
      }
    } else {
      res.status(400).send("Login first to Update the price");
    }
  } catch (error) {
    res.status(400).send(`some error occured!!`);
  }
});

app.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const Token = req.cookies.Token;
    if (Token) {
      const verification = jwt.verify(Token, secret_key);
      const userId = verification.userId;
      if (userId == "admin") {
        const productId = req.params.productId;
        // console.log(productId);
        const Data = await ProductModel.deleteOne({ productId });
        res.status(200).send("Deleted!!");
      } else {
        res.status(400).send("You are not authorized to delete this data!!");
      }
    } else {
      res.status(400).send("Login first to delete data!!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("some error occured!!");
  }
});

app.post("/selectCategory", async (req, res) => {
  try {
    const { category } = req.body;
    const Data = await ProductModel.find({ category });
    if (!Data) {
      res.status(400).send("No products are present for this category!!");
    } else {
      res.status(200).send(Data);
    }
  } catch (error) {
    res.status(400).send("Some error occured!!");
  }
});
app.listen(8000, () => {
  console.log("listening!!");
});
