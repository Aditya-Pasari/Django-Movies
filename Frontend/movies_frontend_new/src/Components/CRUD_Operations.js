import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import CreateMovie from "./CRUDs/CreateMovie";
import ReadMovie from "./CRUDs/ReadMovie";
import UpdateMovie from "./CRUDs/UpdateMovie";
import DeleteMovie from "./CRUDs/DeleteMovie";



function CRUD_Operations() {

  const movie = {
    'id': '',
    'name': '',
    'actors': '',
    'release_date': '',
    'poster_path': '',
    'genres': '',
    'ratings': '',
    'ratings_count': '',

  }

  return (
    <div className="centered">
      <h1>Perform CRUD Operations</h1> <hr />
      <CreateMovie /> <br />
      <ReadMovie /><br />
      <UpdateMovie movie={movie} /><br />
      <DeleteMovie /><br />

    </div>
  );
}

export default CRUD_Operations;
