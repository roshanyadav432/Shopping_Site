/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../AddToCart/AddToCart.css";
function AddToCart({
  UsersCart,
  QuantityMinus,
  QuantityPlus,
  handleRemoveCartItem,
}) {
  let GrandTotal = 0;
  function handleMinusQuantity(productId) {
    //console.log(productId);
    try {
      QuantityMinus(productId);
    } catch (error) {
      console.log("error in quantity decreasing", error);
    }
  }
  function handlePlusQuantity(productId) {
    // console.log(productId);
    try {
      QuantityPlus(productId);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemove(productId) {
    //console.log(productId);
    try {
      handleRemoveCartItem(productId);
    } catch (error) {
      console.log("error while removing from cart", error);
    }
  }
  return (
    <>
      {UsersCart?.cart.length > 0 ? (
        <div className="All">
          <div className="Container">
            {UsersCart.cart.map((prods) => {
              GrandTotal += prods.quantity * prods.price;
              return (
                <div className="contents" key={prods.productId}>
                  <div className="prods">
                    <img
                      id="imgs"
                      src={`http://localhost:8000/${
                        ("Logic/uploads", prods.ImagePath)
                      }`}
                      alt="Image"
                    />
                    <b>Price: {prods.price}</b>
                    <div className="select">
                      <b> Quantity:</b>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          handleMinusQuantity(prods.productId);
                        }}
                      >
                        -
                      </button>
                      <b> {prods.quantity} </b>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          handlePlusQuantity(prods.productId);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <b>Total Price: {prods.quantity * prods.price}</b>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleRemove(prods.productId);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Billing Details: */}
          <div className="bill">
            <h1>Billing Details</h1>
            <div className="bill-info">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name:</th>
                    <th scope="col">Quantity:</th>
                    <th scope="col">Price:</th>
                    <th scope="col">Toatal Price:</th>
                  </tr>
                </thead>
                <tbody>
                  {UsersCart.cart.map((item) => {
                    return (
                      <tr key={item.productId}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity * item.price}</td>
                      </tr>
                    );
                  })}
                  <p>
                    GrandTotal:<b>{GrandTotal}</b>
                  </p>
                  <Link to={`/address`} className="btn btn-success">
                    Proceed
                  </Link>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h2>Cart is empty</h2>
      )}
    </>
  );
}

export default AddToCart;
