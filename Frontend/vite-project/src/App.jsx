import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Forget from "./Components/Forget/Forget";
import Admin from "./Components/Admin/Admin";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import AddProduct from "./Components/Admin/AddProduct";
import Products from "./Components/Products/Products";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AddToCart from "./Components/AddToCart/AddToCart";
import WishList from "./Components/WishList/WishList";
import Address from "./Components/Address/Address";
import Payment from "./Components/Payment/Payment";
import MyOrder from "./Components/MyOrders/MyOrder";
import Orders from "./Components/Admin/Orders";
function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/admin"];
  const shouldShowNavbar = !noNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const [products, setProducts] = useState([]);
  const [loggedUserId, setLoggedUserId] = useState();
  const [UsersWishList, setUsersWishList] = useState();
  const [noOfWishListItem, setnoOfWishListItem] = useState(0);
  const [noOfCartItem, setNoOfCartItem] = useState(0);
  const [UsersCart, setUsersCart] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts();
    const cookieValue = document.cookie;
    if (cookieValue) {
      const Decode = jwtDecode(cookieValue);
      setLoggedUserId(Decode.userId);
      getAllWishListProds();
      getAllCartProds();
    }
  }, []);

  async function getAllWishListProds() {
    try {
      const Data = await axios.get(`http://localhost:8000/getAllWishListProd`, {
        withCredentials: true,
      });
      setUsersWishList(Data.data);
      setnoOfWishListItem(Data.data.noOfProdsInWishList);
    } catch (error) {
      alert(error.response.data);
    }
  }
  //get All Cart Products:
  async function getAllCartProds() {
    try {
      const Data = await axios.get("http://localhost:8000/cart", {
        withCredentials: true,
      });
      setNoOfCartItem(Data.data.noOfProdsInCart);
      // console.log(Data.data);
      setUsersCart(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleSignUp(formData) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/register",
        formData,
        {
          withCredentia: true,
        }
      );
      alert(Data.data);
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
  }
  async function getAllProducts() {
    try {
      const Data = await axios.get("http://localhost:8000/getAllProducts", {
        withCredentials: true,
      });
      setProducts(Data.data);
    } catch (error) {
      alert(error);
    }
  }

  //handle sign In:
  async function handleSignIn(email, password) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      const role = Data.data.isAdmin;
      console.log(role);
      getAllWishListProds();
      getAllCartProds();
      if (role) {
        alert("hello Admin Login Successfull");
        navigate("./admin");
      } else {
        alert("Login Successfull");
      }
    } catch (error) {
      alert(error.response.data);
    }
  }
  //handle Forget:
  async function handleForgetPass(email, newPass) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/forget",
        {
          email,
          newPass,
        },
        { withCredentials: true }
      );
      // console.log(Data.data);
      alert(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  //handle wishList:
  async function handleWishList(productId) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/AddTowishList",
        { productId },
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      alert(Data.data);
      getAllWishListProds();
    } catch (error) {
      alert(error.response.data);
    }
  }

  //handle handle WishList Item Remove
  async function handleWishListItemRemove(productId) {
    try {
      const Data = await axios.delete(
        `http://localhost:8000/handleWishListItemRemove/${productId}`,
        {
          withCredentials: true,
        }
      );
      alert(Data.data);
      getAllWishListProds();
    } catch (error) {
      alert(error.response.data);
    }
  }
  //handle Add To Cart:
  async function handleAddToCart(productId) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/handleAddToCart",
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      alert(Data.data);
      getAllCartProds();
    } catch (error) {
      alert(error.response.data);
    }
  }

  //handle Minus Quantity:
  async function QuantityMinus(productId) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/minusQuantity",
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllCartProds();
    } catch (error) {
      alert(error.response.data);
    }
  }
  //handle Plus Quantity:
  async function QuantityPlus(productId) {
    try {
      const Data = await axios.post(
        "http://localhost:8000/plusQuantity",
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllCartProds();
    } catch (error) {
      alert(error.response.data);
    }
  }

  //handle Remove Item from Cart
  async function handleRemoveCartItem(productId) {
    try {
      const Data = await axios.delete(
        `http://localhost:8000/removeItemFromCart/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllCartProds();
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      {/* {console.log(loggedUserId)} */}
      {shouldShowNavbar && (
        <Navbar
          noOfWishListItem={noOfWishListItem}
          noOfCartItem={noOfCartItem}
          setProducts={setProducts}
        />
      )}
      {/* {console.log(loggedUserId)} */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setProducts={setProducts}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              handleWishList={handleWishList}
              handleAddToCart={handleAddToCart}
              setProducts={setProducts}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route
          path="/Register"
          element={<Register handleSignUp={handleSignUp} />}
        />
        <Route path="/login" element={<Login handleSignIn={handleSignIn} />} />
        <Route
          path="/forget"
          element={<Forget handleForgetPass={handleForgetPass} />}
        />

        <Route path="/admin" element={<Admin loggedUserId={loggedUserId} />}>
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="UpdateProduct" element={<UpdateProduct />} />
          <Route path="Manage-orders" element={<Orders />} />
        </Route>
        <Route
          path={`/wishlist`}
          element={
            <WishList
              UsersWishList={UsersWishList}
              handleWishListItemRemove={handleWishListItemRemove}
              handleAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path={"/cart"}
          element={
            <AddToCart
              UsersCart={UsersCart}
              QuantityMinus={QuantityMinus}
              QuantityPlus={QuantityPlus}
              handleRemoveCartItem={handleRemoveCartItem}
            />
          }
        ></Route>
        <Route path={`/address`} element={<Address />} />
        <Route
          path={`/payment`}
          element={<Payment setNoOfCartItem={setNoOfCartItem} />}
        />
        <Route path={`/my-orders`} element={<MyOrder />} />
        <Route path={`*`} element={<h1>No page Found!!</h1>} />
      </Routes>
    </>
  );
}

export default App;
