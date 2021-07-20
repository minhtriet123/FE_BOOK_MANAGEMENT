import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAccessToken, removeUserSession } from "../Utils/Common";

export default function ListBook() {
  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  const handleLogout = () => {
    removeUserSession();
  };
  const loadBook = () => {
    axios
      .get(`http://localhost:5000/api/books`, config)
      .then((respone) => {
        const listbooks = respone.data;
        setBooks(listbooks);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/books/${id}`, config)
      .then((respone) => loadBook())
      .catch((error) => console.log(error));
  };
  const handleAddBook = () => {

  }
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
      <div class="d-flex justify-content-around">
      <Link to="/add-book" className="btn btn-success" onClick={handleAddBook}>Add book</Link>
      <Link to="/" onClick={handleLogout} className="btn btn-danger">
        Log-out
      </Link>
      </div>
    
      <br />
      <div class="d-flex p-2">
        <p className="h1">List Books: </p>
        <button type="button" className="btn btn-light" onClick={loadBook}>
          Render Book
        </button>
      </div>
      <br />

      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            <ul className="list-group">
              {books &&
                books.map((book, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveBook(book, index)}
                    key={index}
                  >
                    {book.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            {currentBook ? (
              <div>
                <div className="d-flex flex-column">
                  <div className="p-2">
                    <div className="d-flex flex-row">
                      <div className="p-2">
                        <p>
                          <strong>TITLE : </strong>
                          {currentBook.title}
                        </p>{" "}
                      </div>
                      <div className="p-2">
                        <Link className="badge badge-warning">Edit</Link>
                      </div>
                      <div className="p-2">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-warning badge badge-warning "
                          onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(currentBook.id) } }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p>
                      <em>
                        <ins> Description:</ins>
                      </em>{" "}
                      {currentBook.description}
                    </p>
                  </div>
                  <div className="p-2">
                    <div className="d-flex flex-row">
                      <div className="p-2">
                        <label>
                          <em>Author:</em>
                        </label>{" "}
                        {currentBook.author.name}
                      </div>
                      <div className="p-2">
                        <label>
                          <em>Category:</em>
                        </label>{" "}
                        {currentBook.category.name}
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="d-flex flex-row">
                      <div className="p-2">
                        <label>
                          <em>Publish Year:</em>
                        </label>{" "}
                        {currentBook.publish_year}
                      </div>
                      <div className="p-2">
                        <label>
                          <em>Cover:</em>
                        </label>{" "}
                        {currentBook.cover}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a list items...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
