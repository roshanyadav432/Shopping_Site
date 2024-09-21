/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Payment({ setNoOfCartItem }) {
  const [expError, setExpError] = useState(false);
  const [cardNoError, setCardNoError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [error, setError] = useState(false);
  const expRef = useRef();
  const cvvRef = useRef();
  const cardRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getAmount();
  }, []);

  async function getAmount() {
    try {
      const Data = await axios.get("http://localhost:8000/payment", {
        withCredentials: true,
      });
      setGrandTotal(Data.data);
      setError(false);
    } catch (error) {
      alert(error.response.data);
      setError(true);
    }
  }

  async function handlePayment(e) {
    e.preventDefault();
    const card = cardRef.current.value.toString();
    const cvv = cvvRef.current.value.toString();
    const exp = expRef.current.value.toString();
    const month = exp.substring(0, 2);
    const monthNum = Number(month);
    const year = exp.substring(2, 4);
    const yearNum = Number(year);
    console.log(monthNum);
    if (
      card.length == 16 &&
      cvv.length == 3 &&
      exp.length == 4 &&
      monthNum <= 12 &&
      yearNum >= 24
    ) {
      setCardNoError(false);
      setCvvError(false);
      setExpError(false);
      console.log("successfull");
      try {
        const Data = await axios.post(
          "http://localhost:8000/order",
          { grandTotal },
          {
            withCredentials: true,
          }
        );
        alert(Data.data);
        setNoOfCartItem();
        navigate("/products");
      } catch (error) {
        alert(error.response.data);
      }
    } else {
      if (card.length !== 16) {
        setCardNoError(true);
      } else {
        setCardNoError(false);
      }
      if (cvv.length !== 3) {
        setCvvError(true);
      } else {
        setCvvError(false);
      }
      if (exp.length !== 4) {
        setExpError(true);
      } else {
        setExpError(false);
      }
      if (yearNum < 24) {
        setExpError(true);
      } else {
        setExpError(false);
      }
      if (monthNum > 12) {
        setExpError(true);
      } else {
        setExpError(false);
      }
    }
  }
  return (
    <>
      {error ? (
        <h1>Please fill other info first</h1>
      ) : (
        <center>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "60%",
            }}
          >
            <form onSubmit={handlePayment}>
              <h1>Payment Gateway:</h1>
              <div className="address">
                <h1 className="h3 mb-3 fw-normal">Please Fill below Info </h1>
                <div className="form-floating">
                  <input
                    type="Number"
                    className="form-control"
                    id="cardId"
                    placeholder="12"
                    required
                    ref={cardRef}
                  />
                  <label htmlFor="roomNo">Card No:</label>
                  {cardNoError && (
                    <p style={{ color: "red" }}>Please enter valid card No:</p>
                  )}
                </div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="cvv"
                    placeholder="Aptartment Name"
                    required
                    ref={cvvRef}
                  />
                  <label htmlFor="cvv">CVV:</label>
                  {cvvError && (
                    <p style={{ color: "red" }}>Please enter valid CVV No:</p>
                  )}
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="exp"
                    placeholder="expiry"
                    required
                    ref={expRef}
                  />
                  <label htmlFor="exp">
                    Expiry_date, eg: january 2021= 0121
                  </label>
                  {expError && (
                    <p style={{ color: "red" }}>
                      Please enter valid Expiry Date:
                    </p>
                  )}
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="grandTotal"
                    placeholder="grandTotal"
                    required
                    value={grandTotal}
                    readOnly
                  />
                  <label htmlFor="grandTotal">Amount</label>
                </div>

                <button className="w-100 btn btn-lg btn-success" type="submit">
                  Pay
                </button>
              </div>
            </form>
          </div>
        </center>
      )}
    </>
  );
}

export default Payment;
