import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL, getAccessToken } from "../Utils/Common";
import AutocomplementBox from "./AutocomplementBox.component";
import ErrorMessage from "./ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBook() {
  const [title, setTitle] = useState();
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [cover, setCover] = useState();
  const [errorMess, setError] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/authors`, config)
      .then((respone) => {
        console.log(respone.data);
        const authors = respone.data;
        setAuthors(authors);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${BASE_URL}/api/categories`, config)
      .then((respone) => {
        console.log(respone.data);
        const categories = respone.data;
        setCategories(categories);
      })
      .catch((err) => console.log(err));
    return () => {
      setAuthors([]);
      setCategories([]);
    };
  }, []);
  let history = useHistory();
  const handleSave = () => {
    setError(null);
    const data = {
      title,
      authorId,
      categoryId,
      publishYear,
      price,
      description,
      cover,
    };
    axios
      .post(`${BASE_URL}/api/books/create-book`, data, config)
      .then((respone) => {
        notifySuccess();
      })
      .catch((error) => {
        setError(error.response.data.message);
        notifyError();
      });
  };
  const notifySuccess = () =>
    toast.success("Add successfully!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const notifyError = () =>
    toast.error(" Fail!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  return (
    <div>
      <div className="container">
        <ToastContainer />
        <Link to="/">Home</Link>
        <p className="h4"> Add New Book: </p>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group d-flex justify-content-around">
            <label>Author Name:</label>
            <AutocomplementBox
              data={authors}
              setName={setAuthorName}
              setId={setAuthorId}
            />
            <label>Category Name:</label>
            <AutocomplementBox
              data={categories}
              setName={setCategoryName}
              setId={setCategoryId}
            />
          </div>
          <div className="form-group">
            <label>Publish Year</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cover</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCover(e.target.value)}
            />
          </div>

          <button type="reset" className="badge badge-danger mr-2">
            Reset
          </button>
        </form>
        <div>
          <button
            type="submit"
            className="badge badge-success"
            onClick={handleSave}
          >
            Add
          </button>
        </div>

        {ErrorMessage && <ErrorMessage message={errorMess} />}
      </div>
    </div>
  );
}
