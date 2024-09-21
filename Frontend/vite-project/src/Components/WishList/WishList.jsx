/* eslint-disable react/prop-types */
import "./WishList.css";
function WishList({
  UsersWishList,
  handleWishListItemRemove,
  handleAddToCart,
}) {
  return (
    <div>
      <h5>Your WishList:</h5>
      {UsersWishList ? (
        <div className="container">
          {UsersWishList.wishList.map((prod) => {
            return (
              <div className="prods" key={prod._id}>
                <img
                  id="imgs"
                  src={`http://localhost:8000/${
                    ("Logic/uploads", prod.ImagePath)
                  }`}
                  alt="Image"
                />
                <h5>{prod.name}</h5>
                <h5>price: {prod.price}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleWishListItemRemove(prod.productId);
                  }}
                >
                  Remove
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(prod.productId);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>You Do not have any product</h1>
      )}
    </div>
  );
}

export default WishList;
