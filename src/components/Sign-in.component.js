import login_img from "../assets/images/login.jpg";
import "../assets/css/login.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import ErrorMessage from "./ErrorMessage";

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorMess, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = () => {
    setError(null);
    setLoading(true);
    axios
      .post(`http://localhost:5000/api/users/signin`, {
        email,
        password,
      })
      .then((respone) => {
        setLoading(false);
        setUserSession(respone.data.accessToken);
        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={login_img} alt="Login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <p className="login-card-description">Sign into your account</p>
                <form action="#!">
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="***********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="button"
                    value={loading ? "Loading..." : "Login"}
                    onClick={handleSubmit}
                  />
                  {errorMess && <ErrorMessage message={errorMess} />} 
                </form>
                <a href="#!" className="forgot-password-link">
                  Forgot password?
                </a>
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <Link to='/signup' className="text-reset">
                  Register here
                  </Link>
                </p>
                <nav className="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
