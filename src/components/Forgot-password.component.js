import axios from "axios";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [errorMess, setErrorMest] = useState(null);
  const [send, setSend] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/forgot`, { email })
      .then((res) => setSend(true))
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      {!send ? (
        <form className="form-forgot-password" onSubmit={onSubmit}>
          <h1>Enter your email:</h1>
          <input
            type="email"
            className="form-control"
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit" className="btn  btn-primary">
            Send
          </button>
        </form>
      ) : (
        <h2>Please check your email...</h2>
      )}
    </div>
  );
}

export default ForgotPassword;
