/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
function Register({ handleSignUp }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const passRef = useRef();
  const cnpassRef = useRef();
  const profileRef = useRef();

  const [passError, setPassError] = useState(false);
  function handleRegister(e) {
    try {
      e.preventDefault();

      if (passRef.current.value !== cnpassRef.current.value) {
        setPassError(true);
        return;
      }
      setPassError(false);
      console.log(profileRef.current.files[0]);
      const formData = new FormData();
      formData.append("userName", nameRef.current.value);
      formData.append("age", ageRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("gender", genderRef.current.value);
      formData.append("password", passRef.current.value);
      formData.append("file", profileRef.current.files[0]);
      // console.log(formData);
      //this function is dealing with the backend:
      handleSignUp(formData);
      nameRef.current.value = "";
      ageRef.current.value = "";
      emailRef.current.value = "";
      genderRef.current.value = "";
      passError.current.value = "";
      cnpassRef.current.value = "";
      profileRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating">
          <input
            type="text"
            required
            className="form-control"
            id="floatingInputName"
            placeholder="user name:"
            ref={nameRef}
            autoComplete="true"
          />
          <label htmlFor="floatingInputName">User Name</label>
        </div>
        {/* age: */}
        <div className="form-floating">
          <input
            autoComplete="true"
            required
            type="number"
            className="form-control"
            id="floatingInputAge"
            placeholder="Age"
            ref={ageRef}
          />
          <label htmlFor="floatingInputAge">Age</label>
        </div>
        <div className="form-floating">
          <input
            autoComplete="true"
            required
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            ref={emailRef}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        {/* gender: */}
        <div className="form-floating">
          <select
            className="form-control"
            id="gender"
            required
            ref={genderRef}
            autoComplete="true"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          <label htmlFor="gender">select Gender</label>
        </div>

        {/* select dp */}
        <div className="form-floating">
          <input
            type="file"
            autoComplete="true"
            required
            className="form-control"
            id="userDp"
            placeholder="Password"
            accept=".jpg,.jpeg,.png"
            ref={profileRef}
          />
          <label htmlFor="userDp">Select Your Profile picture:</label>
        </div>

        {/* password: */}
        <div className="form-floating">
          <input
            autoComplete="true"
            ref={passRef}
            required
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {/* repass */}
        <div className="form-floating">
          <input
            autoComplete="true"
            ref={cnpassRef}
            required
            type="password"
            className="form-control"
            id="rePassword"
            placeholder="rePassword"
          />
          <label htmlFor="rePassword">Confirm Password</label>
        </div>
        {passError && (
          <p style={{ color: "red" }}>
            Invalid Password Enter confirm password same as password
          </p>
        )}
        {/* register button: */}
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
        <Link to={"/login"}>Already Registered? Login</Link>
        <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
      </form>
    </div>
  );
}

export default Register;
