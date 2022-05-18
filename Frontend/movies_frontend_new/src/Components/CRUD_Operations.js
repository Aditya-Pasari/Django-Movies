import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import CreateMovie from "./CRUDs/CreateMovie";
import ReadMovie from "./CRUDs/ReadMovie";
import UpdateMovie from "./CRUDs/UpdateMovie";
import DeleteMovie from "./CRUDs/DeleteMovie";



function CRUD_Operations() {
  return (
    <div className="centered">
      <h1>Perform CRUD Operations</h1>
      <CreateMovie /> <br /><br />
      <ReadMovie /><br /><br />
      <UpdateMovie /><br /><br />
      <DeleteMovie /><br /><br />




    </div>
  );
}

export default CRUD_Operations;
