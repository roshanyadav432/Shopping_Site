/* eslint-disable react/prop-types */
import "./Single_Product.css";
function Single_Product({ prod, handleAddToCart }) {
  return (
    <>
      <p
        data-bs-toggle="modal"
        data-bs-target={`#${prod._id}`}
        style={{ color: "#057844", cursor: "pointer" }}
      >
        View Details
      </p>
      <div
        className="modal fade modal-xl"
        id={`${prod._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${prod._id}`}>
                Product Description
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="content">
                <div className="imgage">
                  <img
                    id="img"
                    src={`http://localhost:8000/${
                      ("Logic/uploads", prod.ImagePath)
                    }`}
                    alt="Image"
                  />
                </div>
                <div className="desc">
                  <h3>{prod.name}</h3>
                  <h5>{prod.description}</h5>
                  <h5>Price: {prod.price}</h5>
                  <h5>Rating: {prod.rating}</h5>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  handleAddToCart(prod.productId);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Single_Product;
