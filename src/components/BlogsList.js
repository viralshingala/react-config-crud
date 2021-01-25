import React, { useState, useEffect } from "react";
import BlogService from "../services/BlogService";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBlogs();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBlogs = () => {
    BlogService.getAll()
      .then(response => {
        setBlogs(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBlogs();
    setCurrentBlog(null);
    setCurrentIndex(-1);
  };

  const setActiveBlog = (blog, index) => {
    setCurrentBlog(blog);
    setCurrentIndex(index);
  };

  const removeAllBlogs = () => {
    BlogService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BlogService.findByTitle(searchTitle)
      .then(response => {
        setBlogs(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Blogs List</h4>

        <ul className="list-group">
          {blogs &&
            blogs.map((blog, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBlog(blog, index)}
                key={index}
              >
                {blog.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBlog ? (
          <div>
            <h4>Blog</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlog.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBlog.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlog.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/blogs/" + currentBlog.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
