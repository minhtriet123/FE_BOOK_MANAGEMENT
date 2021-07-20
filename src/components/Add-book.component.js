import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../Utils/Common";
import ErrorMessage from "./ErrorMessage";

export default function AddBook() {
  const [title, setTitle] = useState();
  const [authorId, setAuthorId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [publishYear, setPublishYear] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [cover, setCover] = useState();

  const [errorMess, setError] = useState(null);

  let history = useHistory();
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
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
      .post(`http://localhost:5000/api/books/create-book`, data, config)
      .then((respone) => {
        history.push("/books");
      })
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <div>
      <div className="container">
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
          <div className="form-group">
            <label>Author ID</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setAuthorId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category ID</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setCategoryId(e.target.value)}
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
        <button
            type="submit"
            className="badge badge-success"
            onClick={handleSave}
          >
            Add
          </button>
        {ErrorMessage && <ErrorMessage message={errorMess} />}
      </div>
    </div>
  );
}
