import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import { BASE_URL } from "../Utils/Common";
import ErrorMessage from "./ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ResetPassword.propTypes = {};

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [redirect, setRedirect] = useState(false);
  const [errorMess, setError] = useState(null);
  const { token } = useParams();
  const notifySuccess = () =>
    toast.success("Set New Password Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/reset`, {
        token,
        password,
        passwordConfirm,
      })
      .then((res) => {
        notifySuccess();
        console.log(res);
      })
      .catch((err) => {
        setRedirect(false);
        setError(err.response.data.message);
      });

    console.log(token);
  };
  if (redirect) {
    return <p>Successfully!</p>;
  }
  return (
    <div className="container">
      <div>
        <ToastContainer />
      </div>
      <form className="form-reset" onSubmit={submit}>
        <h1>Please Set Your New Password</h1>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <br />
        <button className="btn btn-primary btn-block" type="submit">
          Reset password
        </button>
      </form>
      {errorMess && <ErrorMessage message={errorMess} />}
    </div>
  );
};

export default ResetPassword;
