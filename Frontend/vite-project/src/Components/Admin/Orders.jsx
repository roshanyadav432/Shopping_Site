import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ShowInfo from "./ShowInfo";
import ShowAddress from "./ShowAddress";

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const statusRef = useRef();
  useEffect(() => {
    getAllOrders();
    // console.log(new Date());
  }, []);

  async function handleStatus(orderId) {
    try {
      // console.log(orderId);

      const Data = await axios.post(
        `http://localhost:8000/handleStatus/${orderId}`,
        { status: statusRef.current.value },
        {
          withCredentials: true,
        }
      );
      alert(Data.data);
      getAllOrders();
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function getAllOrders() {
    try {
      const Data = await axios.get("http://localhost:8000/getAllOrders", {
        withCredentials: true,
      });
      setOrderData(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">OrderId:</th>
            <th scope="col">UserId:</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Date:</th>
            <th scope="col"> Product </th>
            <th scope="col"> Address</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.map((ords) => {
            return (
              <tr key={ords.orderId}>
                <td>{ords.orderId}</td>
                <td>{ords.userId}</td>
                <td>{ords.grandTotal}</td>
                <td>
                  <select
                    ref={statusRef}
                    onChange={() => {
                      handleStatus(ords.orderId);
                    }}
                  >
                    <option>{ords.status}</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>{ords.billing_Address.orderDate}</td>
                <td>
                  <ShowInfo ords={ords} />
                </td>
                <td>
                  <ShowAddress ords={ords} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
