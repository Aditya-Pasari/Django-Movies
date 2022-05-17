import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Movie() {
  return (
    <div className="centered">
      <h2>This is Movie PAGE. But Not going. s</h2>
      <p> Add a Movie</p>
      <p> Get a Movie</p>
      <p> Update a Movie</p>
      <p> Delete a Movie</p>
      <Link className="nav-link" to="/">
        Home
      </Link>
    </div>
  );
}

export default Movie;
