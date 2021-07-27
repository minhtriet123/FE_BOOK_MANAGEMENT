import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL, getAccessToken } from "../Utils/Common";
import queryString from "query-string";
import { Link, useHistory } from "react-router-dom";

export default function AuthorCategory() {
  const [authors, setAuthors] = useState();
  const [categories, setCategories] = useState();
  const [filters, setFilter] = useState({
    newCategory: "",
    newAuthor: "",
    search: "",
  });
  const [newAuthor, setNewAuthor] = useState();
  const [newCategory, setNewCategory] = useState();
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  useEffect(() => {
    const paramString = queryString.stringify(filters);
    axios
      .get(`${BASE_URL}/api/authors?${paramString}`, config)
      .then((respone) => {
        console.log(respone.data);
        const authors = respone.data;
        setAuthors(authors);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${BASE_URL}/api/categories?${paramString}`, config)
      .then((respone) => {
        console.log(respone.data);
        const categories = respone.data;
        setCategories(categories);
      })
      .catch((err) => console.log(err));
  }, [filters]);
  let history = useHistory();
  const addAuthor = (authorname) => {
    axios
      .post(
        `${BASE_URL}/api/authors`,
        { name: authorname },
        config
      )
      .then(() => {
        setFilter({ ...filters, newAuthor: newAuthor });
        history.push("/author-category");
      })
      .catch((err) => console.log(err));
  };
  const addCategory = (categoryName) => {
    axios
      .post(`${BASE_URL}/api/categories`, { name: categoryName }, config)
      .then(() => {
        setFilter({ ...filters, newCategory: newCategory });
        history.push("/author-category");
      })
      .catch((err) => console.log(err));
  };
  const deleteAuthor = (id) =>{
    axios
    .delete(`${BASE_URL}/api/authors/${id}`, config)
    .then((respone) => setFilter({...filters}))
    .catch((error) => console.log(error));
  };
  const deleteCategory = (id) =>{
    axios
    .delete(`${BASE_URL}/api/categories/${id}`, config)
    .then((respone) => setFilter({...filters}))
    .catch((error) => console.log(error));
  }
  return (
    <div className="container">
      <Link to="/">Home</Link>
      <div class="d-flex flex-row-reverse">
        <input
          type="text"
          placeholder="ID/name"
          style={{ margin: 10 }}
          onChange={(e) => {
            setFilter({ search: e.target.value });
          }}
        />
        <h5 style={{ margin: 10 }}>Search: </h5>
      </div>
      <div className="author">
        <h2 className="d-flex">Authors:</h2>

        <input
          type="text"
          placeholder=" New author"
          onChange={(e) => {
            setNewAuthor(e.target.value);
          }}
        ></input>
        <button
          className="btn btn-light"
          style={{ margin: 10 }}
          onClick={() => {
            if (window.confirm("Add new author?")) addAuthor(newAuthor);
          }}
        >
          Add
        </button>
        <table class="table table-striped table-light">
          <thead>
            <tr>
              <th scope="col">ID author</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {authors ? (
              authors.map((author) => (
                <tr>
                  <td style={{   }}>{author.id}</td>
                  <td style={{  }}>{author.name}</td>
                  <td style={{ width: '10%' }}>
                    <button className="btn btn-info btn-sm" style={{ fontSize: 12 }}  onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              deleteAuthor(author.id);
                          }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading authors...</div>
            )}
          </tbody>
        </table>
      </div>
      <div className="">
        <h2>Categories:</h2>

        <input
          type="text"
          placeholder=" New category"
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
        ></input>
        <button
          className="btn btn-light"
          style={{ margin: 10 }}
          onClick={() => {
            if (window.confirm("Add new category?")) addCategory(newCategory);
          }}
        >
          Add
        </button>
        <table class="table table-striped table-light">
          <thead>
            <tr>
              <th scope="col">ID categories</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories ? (
              categories.map((category) => (
                <tr>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td style={{ width: '10%' }}>
                    <button className="btn btn-info btn-sm" style={{ fontSize: 12 }}  onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              deleteCategory(category.id);
                          }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading categories...</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
