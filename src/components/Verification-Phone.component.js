import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BASE_URL, getAccessToken } from "../Utils/Common";

function VerificationPhone() {
  const [code, setCode] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFalse] = useState(false);
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  useEffect(() => {}, [isSuccess, isFail]);
  let history = useHistory();
  const submit = () => {
    const data = {
      code,
    };
    axios
      .post(`${BASE_URL}/sms/check-verification-code`, data, config)
      .then((res) => {
        console.log(res);
        isSuccess = true;
        isFail = false;
      })
      .catch((err) => {
        console.log(err);
        isFail = true;
        isSuccess = false;
      });
  };
  return (
    <div>
      <p
        class="text-center"
        style={{
          color: "Blue",
        }}
      >
        We sent a code pin to your number phone, please check
      </p>
      <div class="mx-auto" style={{ width: "200px" }}>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Code Pin"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button type="submit" classname="btn btn-primary btn-sm">
            Verify
          </button>
        </form>
        {isSuccess ? (
          <p style={{ color: "green" }}>Confirm successfully!</p>
        ) : (
          <div></div>
        )}
        {isFail ? (
          <p style={{ color: "red" }}>Pin is not matched! Try again</p>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default VerificationPhone;
