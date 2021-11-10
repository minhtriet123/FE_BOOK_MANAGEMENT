import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BASE_URL, getAccessToken } from "../Utils/Common";
import ErrorMessage from "./ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutocomplementBox from "./AutocomplementBox.component";

export default function EditBook() {
  const [title, setTitle] = useState();
  const [authorId, setAuthorId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [authorName, setAuthorName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [publishYear, setPublishYear] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [cover, setCover] = useState();

  const [errorMess, setError] = useState(null);

  const setAll = (respone) => {
    setTitle(respone.data.title);
    setAuthorId(respone.data.author.id);
    setCategoryId(respone.data.category.id);
    setAuthorName(respone.data.author.name);
    setCategoryName(respone.data.category.name);
    setPublishYear(respone.data.publish_year);
    setPrice(respone.data.price);
    setDescription(respone.data.description);
    setCover(respone.data.cover);
  };
  let history = useHistory();
  useEffect(() => {
    async function fectData() {
      axios
        .get(`${BASE_URL}/api/books/${id}`, config)
        .then((respone) => {
          console.log(respone);
          setAll(respone);
        })
        .catch((error) => setError(error.response.data.message));
    }
    fectData();
  }, []);

  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  const deleteItem = (id) => {
    axios
      .delete(`${BASE_URL}/api/books/${id}`, config)
      .then((respone) => history.push("/"))
      .catch((error) => console.log(error));
  };
  const { id } = useParams();
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
      .put(`${BASE_URL}/api/books/${id}/edit`, data, config)
      .then((respone) => {
        notifySuccess();
      })
      .catch((error) => {
        notifyError();
        setError(error.response.data.message);
      });
  };
  const notifySuccess = () =>
    toast.success("Update successfully!", {
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
        <Link to="/">Home</Link>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
            />
          </div>
          <div className="form-group">
            <label>Author Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={authorName}
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={categoryName}
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label>Publish Year</label>
            <input
              type="text"
              className="form-control"
              defaultValue={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cover</label>
            <input
              type="text"
              className="form-control"
              defaultValue={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>
        </form>
        <button
          type="button"
          className="badge badge-danger mr-2"
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              deleteItem(id);
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className="badge badge-success"
          onClick={handleSave}
        >
          Save
        </button>
        <ToastContainer />
        {ErrorMessage && <ErrorMessage message={errorMess} />}
      </div>
    </div>
  );
}
