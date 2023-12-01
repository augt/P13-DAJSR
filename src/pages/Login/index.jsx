import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import { Link } from "react-router-dom"; */
import { login } from "../../redux/user/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  console.log(token);
  async function onLoginClick() {
    try {
      await dispatch(login({ username, password })).unwrap();
      if (errorMessage) {
        setErrorMessage(null);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button
            className="sign-in-button"
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
          >
            Sign In
          </button>
          <div className="error-message">{errorMessage}</div>
          {/* <Link to="/profile" className="sign-in-button">
            Sign In
          </Link> */}
        </form>
      </section>
    </main>
  );
}

export default Login;
