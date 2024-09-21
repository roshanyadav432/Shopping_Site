import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Address() {
  const [panError, setPanError] = useState(false);
  const pinRef = useRef();
  const roomRef = useRef();
  const aptRef = useRef();
  const areaRef = useRef();
  const cityRef = useRef();
  const navigate = useNavigate();

  async function handleAddress(e) {
    try {
      e.preventDefault();
      if (pinRef.current.value.length == 6) {
        setPanError(false);
        const UserAddress = {
          room_no: roomRef.current.value,
          apt_name: aptRef.current.value,
          area_name: areaRef.current.value,
          city_name: cityRef.current.value,
          pin_code: pinRef.current.value,
        };
        //console.log(UserAddress);
        const Data = await axios.post(
          "http://localhost:8000/address",
          UserAddress,
          {
            withCredentials: true,
          }
        );
        if (Data.data.msg == "stop") {
          navigate("/products");
        } else {
          navigate(`/payment`);
        }
      } else {
        setPanError(true);
      }
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <center>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <h1>Address Details:</h1>
        <div className="address">
          <form className="form-signin" onSubmit={handleAddress}>
            <h1 className="h3 mb-3 fw-normal">Please Fill Address </h1>
            <div className="form-floating">
              <input
                type="Number"
                className="form-control"
                id="roomNo"
                placeholder="12"
                required
                ref={roomRef}
              />
              <label htmlFor="roomNo">Room No:</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="AptName"
                placeholder="Aptartment Name"
                required
                ref={aptRef}
              />
              <label htmlFor="AptName">Apartment Name:</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="areaName"
                placeholder="areaName"
                required
                ref={areaRef}
              />
              <label htmlFor="areaName">Area Name:</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="cityName"
                placeholder="cityName"
                required
                ref={cityRef}
              />
              <label htmlFor="cityName">City Name:</label>
            </div>

            <div className="form-floating">
              <input
                type="Number"
                className="form-control"
                id="PinCode"
                placeholder="PinCode"
                required
                ref={pinRef}
              />
              <label htmlFor="PinCode">Pin Code:</label>
            </div>
            {panError && (
              <p style={{ color: "red" }}>Pleasr Enter Valid Pin Code</p>
            )}
            <button className="w-100 btn btn-lg btn-success" type="submit">
              Next
            </button>
          </form>
        </div>
      </div>
    </center>
  );
}

export default Address;
