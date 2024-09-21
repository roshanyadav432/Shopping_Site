/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";

function Login({ handleSignIn }) {
  const passRef = useRef();
  const emailRef = useRef();
  function handleLogin(e) {
    e.preventDefault();
    // console.log(passRef.current.value);
    // console.log(emailRef.current.value);
    handleSignIn(emailRef.current.value, passRef.current.value);
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            ref={emailRef}
            autoComplete="true"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            ref={passRef}
            autoComplete="true"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <Link to={"/Register"}>Do not have account</Link>
        <br />
        <Link to={"/forget"}>Forget Password</Link>
        <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
      </form>
    </div>
  );
}

export default Login;
