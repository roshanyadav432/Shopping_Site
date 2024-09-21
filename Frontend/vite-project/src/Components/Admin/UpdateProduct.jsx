import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./UpdateProduct.css";
function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const priceRef = useRef();
  const stockRef = useRef();
  const [priceError, setPriceError] = useState(false);
  const [stockError, setstockError] = useState(false);
  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const Data = await axios.get("http://localhost:8000/getAllProducts", {
        withCredentials: true,
      });
      setProducts(Data.data);
      setLoading(false);
    } catch (error) {
      alert(Error.response.data);
    }
  }

  async function handlePriceUpdate(productId) {
    try {
      if (priceRef.current.value == "") {
        setPriceError(true);
      } else {
        setPriceError(false);
        const Data = await axios.put(
          `http://localhost:8000/updatePrice/${productId}`,
          {
            price: priceRef.current.value,
          },
          { withCredentials: true }
        );
        alert(Data.data);
        setPrice("");
        getAllProducts();
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleStockUpdate(productId) {
    try {
      if (stockRef.current.value == "") {
        setstockError(true);
      } else {
        setstockError(true);
        const Data = await axios.put(
          `http://localhost:8000/updateStock/${productId}`,
          {
            stock: stockRef.current.value,
          },
          { withCredentials: true }
        );
        alert(Data.data);
        setStock("");
        getAllProducts();
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleDelete(productId) {
    try {
      const Data = await axios.delete(
        `http://localhost:8000/deleteProduct/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(Data.data);
      getAllProducts();
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <div>
      {loading ? (
        <center>
          <b>Loading...</b>
        </center>
      ) : (
        <div className="prods_Update">
          {products.map((item) => {
            return (
              <div className="updates" key={item.productId}>
                <div className="image">
                  <img
                    id="imgs"
                    src={`http://localhost:8000/${
                      ("Logic/uploads", item.ImagePath)
                    }`}
                    alt="image"
                  />
                </div>
                <div
                  className="inform"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <b>name: {item.name}</b>
                  {price == item.productId ? (
                    <>
                      {priceError && (
                        <p style={{ color: "red" }}>Enter some price:</p>
                      )}
                      <input
                        type="number"
                        required
                        ref={priceRef}
                        placeholder="enter your price"
                      />
                    </>
                  ) : (
                    <b>price: {item.price}</b>
                  )}

                  {stock == item.productId ? (
                    <>
                      {stockError && (
                        <p style={{ color: "red" }}>Enter some Stock:</p>
                      )}
                      <input
                        type="number"
                        required
                        ref={stockRef}
                        placeholder="enter your stock"
                      />
                    </>
                  ) : (
                    <b>stock: {item.stock}</b>
                  )}
                </div>
                <div className="buttons"></div>
                {price == item.productId ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handlePriceUpdate(item.productId);
                    }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setPrice(item.productId);
                    }}
                  >
                    edit price
                  </button>
                )}

                {stock == item.productId ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleStockUpdate(item.productId);
                    }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setStock(item.productId);
                    }}
                  >
                    edit stock
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(item.productId);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
