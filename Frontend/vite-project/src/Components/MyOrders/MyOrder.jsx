import axios from "axios";
import { useEffect, useState } from "react";

function MyOrder() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getMyOrder();
  }, []);
  async function getMyOrder() {
    try {
      const Data = await axios.get("http://localhost:8000/MyOrders", {
        withCredentials: true,
      });
      setOrders(Data.data);
      setLoading(false);
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <div>
      {loading ? (
        <center>Loading...</center>
      ) : (
        <div>
          {orders.map((item) => {
            return (
              <div
                key={item.orderId}
                style={{
                  border: "2px solid green",
                  marginTop: "20px",
                }}
              >
                <div
                  className="inner"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {item.products.map((prod) => {
                    return (
                      <div className="producs" key={prod._id}>
                        <img
                          style={{ height: "9rem", width: "9rem" }}
                          src={`http://localhost:8000/${
                            ("Logic/uploads", prod.ImagePath)
                          }`}
                          alt="Image"
                        />
                        <p>
                          <b>{prod.name}</b>
                        </p>
                        <p>
                          <b>price: {prod.price}</b>
                        </p>
                        <p>
                          <b>quantity: {prod.quantity}</b>
                        </p>
                      </div>
                    );
                  })}
                  <div
                    className="inform"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <h1>stataus:{item.status}</h1>
                    <h1>Total amount:{item.grandTotal}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
