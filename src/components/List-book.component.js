import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, getAccessToken, removeUserSession } from "../Utils/Common";
import Pagination from "./Pagination.component";
import queryString from "query-string";
import SearchDebounce from "./SearchDebounce.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListBook() {
  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemCount: 10,
    totalItems: 11,
    totalPages: 2,
  });

  const [filters, setFilters] = useState({
    limit: 5,
    page: 1,
    search: "",
  });
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  const [showSuc, setShowSuc] = useState(false);
  const handlePageChange = (newPage) => {
    console.log("new page:" + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const handleLogout = () => {
    removeUserSession();
  };

  useEffect(() => {
    fectBooks();
  }, [filters]);

  async function fectBooks() {
    const paramString = queryString.stringify(filters);
    axios
      .get(`${BASE_URL}/api/books?${paramString}`, config)
      .then((respone) => {
        console.log(respone.data);
        const listbooks = respone.data.items;
        const pag = respone.data.meta;
        setPagination(pag);
        setBooks(listbooks);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };

  const deleteItem = (id) => {
    axios
      .delete(`${BASE_URL}/api/books/${id}`, config)
      .then((respone) => {
        fectBooks();
        notifySuccess();
      })
      .catch((error) => {
        console.log(error);
        notifyError();
      });
  };

  const handleFiltersChange = (newFilters) => {
    console.log(newFilters);
    setFilters({
      ...filters,
      page: 1,
      search: newFilters.searchTerm,
    });
  };
  const notifySuccess = () =>
    toast.success("Delete successfully!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    const notifyError = () =>
    toast.error("Delete Fail!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  return (
    <div className="container">
      <div>
        <ToastContainer />
      </div>

      <div className="d-flex justify-content-around p-2 bg-light">
        <nav className="navbar navbar-light ">
          <SearchDebounce
            onSubmit={handleFiltersChange}
            placeHolder="Search by title"
          />
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
        <Link to="/add-book" className="btn btn-success menu">
          Add book
        </Link>
        <Link to="/profile" className="btn btn-info menu">
          Profile
        </Link>
        <Link to="/author-category" className="btn btn-light menu">
          Author/Category
        </Link>
        <Link to="/" onClick={handleLogout} className="btn btn-danger menu">
          Log-out
        </Link>
      </div>

      <br />
      <div class="d-flex p-2">
        <p className="h1">List Books: </p>
      </div>
      <br />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      ></Pagination>
      <br />
      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            <ul className="list-group">
              {!books ? (
                "Loading books..."
              ) : !books.length ? (
                "No books was found!"
              ) : (
                <div></div>
              )}
              {}
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
                        <Link
                          to={"/books/" + currentBook.id}
                          className="badge badge-warning"
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="p-2">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-warning badge badge-warning "
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              deleteItem(currentBook.id);
                          }}
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
