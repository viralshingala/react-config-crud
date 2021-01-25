import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import BlogsList from "./components/BlogsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/blogs" className="navbar-brand">
          Galaxy
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/blogs"} className="nav-link">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/blogs"]} component={BlogsList} />
          <Route exact path="/add" component={AddBlog} />
          <Route path="/blogs/:id" component={Blog} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
