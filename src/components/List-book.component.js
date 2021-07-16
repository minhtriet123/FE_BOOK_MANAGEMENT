import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAccessToken, removeUserSession } from "../Utils/Common";

export default function ListBook() {
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  useEffect(() => {
    loadBook();
  });
  const handleLogout = () => {
    removeUserSession();
  };
  const loadBook = () => {
    axios
      .get(`http://localhost:5000/api/books`, config)
      .then((respone) => {
        console.log(respone);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-around p-2 bg-light">
        <nav className="navbar navbar-light ">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search By Title"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>
        <nav className="navbar navbar-light flex-row-reverse">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Author"
              aria-label="Author"
            />
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Category"
              aria-label="Category"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Filter
            </button>
          </form>
        </nav>
      </div>
      <br />
      <Link to="/" onClick={handleLogout}>
        {" "}
        Log-out{" "}
      </Link>
      <br />
      <p className="h1">List Books: </p>
      <br />
      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            <a
              className="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home"
            >
              Book1
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile"
            >
              Book2
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages"
            >
              Book3
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings"
            >
              Book4
            </a>
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="list-home"
              role="tabpanel"
              aria-labelledby="list-home-list"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="list-profile"
              role="tabpanel"
              aria-labelledby="list-profile-list"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="list-messages"
              role="tabpanel"
              aria-labelledby="list-messages-list"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="list-settings"
              role="tabpanel"
              aria-labelledby="list-settings-list"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
