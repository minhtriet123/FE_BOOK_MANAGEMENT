import { Link } from "react-router-dom";
import login_img from "../assets/images/login.jpg";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setPasswordConfirm] = useState();

  const [errorMess, setError] = useState(null);

  let history = useHistory();

  const handleSubmit = () => {
    setError(null);
    axios
      .post(`http://localhost:5000/api/users/signup`, {
        email,
        password,
        confirmPassword,
      })
      .then((respone) => {
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
              <img src={login_img} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <p className="login-card-description">
                  Register your new account
                </p>
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
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password Confirm
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password confirm"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                  <input
                    name="register"
                    id="register"
                    className="btn btn-block login-btn mb-4"
                    type="button"
                    defaultValue="Register"
                    onClick={handleSubmit}
                  />
                  {errorMess && <ErrorMessage message={errorMess} />}
                </form>
                <p className="login-card-footer-text">
                  Already have an account?{" "}
                  <Link to="/" className="text-reset">
                    Login here
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
