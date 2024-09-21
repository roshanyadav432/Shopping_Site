/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./Navbar.css";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
function Navbar({ noOfWishListItem, noOfCartItem, setProducts }) {
  const [showDisp, setShoeDisp] = useState(true);
  const serachRef = useRef();

  async function handleSearch() {
    try {
      const Data = await axios.get(
        `http://localhost:8000/search?name=${serachRef.current.value}`,
        {
          withCredentials: true,
        }
      );
      setProducts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          {showDisp && (
            <ul className="LeftContent">
              <li id="cart">
                <NavLink
                  to={"/cart"}
                  className="nav-link"
                  activeClassName="active"
                  style={{ marginTop: "10px" }}
                >
                  <span style={{ position: "absolute", top: "0px" }}>
                    {noOfCartItem}
                  </span>
                  <FaCartArrowDown />
                </NavLink>
              </li>
              <li id="wishList">
                <NavLink
                  to={"/wishlist"}
                  className="nav-link"
                  activeClassName="active"
                  style={{ marginTop: "10px" }}
                >
                  <span style={{ position: "absolute", top: "0px" }}>
                    {noOfWishListItem}
                  </span>
                  <FaHeart />
                </NavLink>
              </li>
            </ul>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setShoeDisp((showDisp) => {
                return !showDisp;
              });
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              {/* Products */}
              <li className="nav-item">
                <NavLink
                  to={"/products"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  Products
                </NavLink>
              </li>
              {/* WishList */}
              <li className="nav-item">
                <NavLink
                  to={"/cart"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  {noOfCartItem}:
                  <FaCartArrowDown />
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/wishlist"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  {noOfWishListItem}:
                  <FaHeart />
                </NavLink>
              </li>
              {/* Orders: */}
              <li className="nav-item">
                <NavLink
                  to={`/my-orders`}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  My Orders
                </NavLink>
              </li>
              {/*  */}
              <li className="nav-item">
                <NavLink
                  to={"/Register"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  Register
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/login"}
                  className={"nav-link"}
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <input
                id="search"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                ref={serachRef}
                onChange={() => {
                  handleSearch();
                }}
              />

              <Link
                to={"/products"}
                className="btn btn-outline-success"
                onClick={() => {
                  handleSearch();
                }}
              >
                Search
              </Link>
              <br />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
