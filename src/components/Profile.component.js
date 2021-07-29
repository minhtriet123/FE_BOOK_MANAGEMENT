import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/info.css";
import { BASE_URL, getAccessToken } from "../Utils/Common";

export default function Profile() {
  const [email, setEmail] = useState();
  const [idUser, setIdUser] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvartar] = useState("")
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  let history = useHistory();
  const setAll = (respone) => {
    setIdUser(respone.data.id);
    setEmail(respone.data.email);
    setFirstName(respone.data.firstName);
    setLastName(respone.data.lastName);
    setAvartar(respone.data.avatar);
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/users/profile`, config)
      .then((respone) => {
        setAll(respone);
      })
      .catch((err) => console.log(err));
  }, []);
  const updateUser = () => {
    const data = {
      email,
      firstName,
      lastName,
    };
    axios
      .post(`${BASE_URL}/api/users/edit`, data, config)
      .then((respone) => {
        if (!respone) history.push("/profile");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Link to="/">Home</Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>User Profile</h1>
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      src={avatar? avatar : "Avatar"}
                      alt="avatar"
                    />
                  </div>
                  <h5 className="user-name">
                    {firstName ? firstName : "#no_name"}
                  </h5>
                  <h6 className="user-email">{email}</h6>
                </div>
                <div className="about">
                  <h5 className="text-primary">About</h5>
                  <p>Description </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="idUser">ID User</label>
                    <input
                      type="text"
                      className="form-control"
                      id="idUser"
                      value={idUser}
                      readOnly="true"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      value={email}
                      readOnly="true"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      value={firstName ? firstName : ""}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      value={lastName ? lastName : ""}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (window.confirm("Confirm update information?"))
                          updateUser();
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
