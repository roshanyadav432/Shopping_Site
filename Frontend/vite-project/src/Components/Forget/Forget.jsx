/* eslint-disable react/prop-types */
import { useRef } from "react";

function Forget({ handleForgetPass }) {
  const emailRef = useRef();
  const passRef = useRef();

  function handleForget(e) {
    try {
      e.preventDefault();
      handleForgetPass(emailRef.current.value, passRef.current.value);
    } catch (error) {
      console.log("error in register frontend!!");
    }
  }
  return (
    <div>
      <form onSubmit={handleForget}>
        <h1 className="h3 mb-3 fw-normal">Forget</h1>
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
          <label htmlFor="floatingPassword">Enter new Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Update
        </button>

        <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
      </form>
    </div>
  );
}

export default Forget;
