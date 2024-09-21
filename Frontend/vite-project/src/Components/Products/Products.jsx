/* eslint-disable react/prop-types */
import Single_Product from "../SingleProduct_Deatails/Single_Product";
import Filter from "../Filters/Filter";
import "./Product.css";
function Products({
  products,
  handleWishList,
  handleAddToCart,
  setProducts,
  selectedCategory,
}) {
  return (
    <>
      <div className="filter">
        {
          <Filter
            setProducts={setProducts}
            selectedCategory={selectedCategory}
          />
        }
      </div>
      <div className="products">
        {products.length > 0 ? (
          products.map((prod) => {
            return (
              <div className="card" key={prod.productId}>
                <img
                  id="images"
                  src={`http://localhost:8000/${
                    ("Logic/uploads", prod.ImagePath)
                  }`}
                  // className="card-img-top"
                  alt="image"
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <b>Price: {prod.price}</b>
                  <br></br>
                  <b>Rating: {prod.rating}</b>
                  <p
                    id="AddToWish"
                    onClick={() => {
                      handleWishList(prod.productId);
                    }}
                  >
                    Add to WishList
                  </p>
                  {/* View Details about products*/}
                  <Single_Product
                    prod={prod}
                    handleAddToCart={handleAddToCart}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleAddToCart(prod.productId);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </>
  );
}

export default Products;
