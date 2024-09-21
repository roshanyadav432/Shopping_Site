/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
Link;
function Admin() {
  const [adminId, setAdminId] = useState();
  useEffect(() => {
    const cookieValue = document.cookie;
    if (cookieValue) {
      const Decode = jwtDecode(cookieValue);
      setAdminId(Decode.userId);
    }
  }, []);

  return (
    <div>
      {adminId == "admin" ? (
        <center>
          <h1>Hello Admin</h1>
          <Link to={"AddProduct"}>ADD PRODUCT</Link>
          <br />
          <Link to={"UpdateProduct"}>Update PRODUCT</Link>
          <br />
          <Link to={"Manage-orders"}>Manage Orders</Link>
          <Outlet />
        </center>
      ) : (
        <h1 style={{ color: "red" }}>Login First!!!</h1>
      )}
    </div>
  );
}

export default Admin;
