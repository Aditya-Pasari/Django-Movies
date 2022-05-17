import "../css/Home.css";
import { Link } from "react-router-dom";

import React from "react";

import Banner from "./Banner";
import Row from "./Row";

import requests from "../requests";

function Home() {
  return (
    <div className="Home">
      <Banner /> <br />
      <br />
      <Row
        title="Top This Year (2019)"
        fetchUrl={requests.fetchLatestTopMovies}
      ></Row>
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies}></Row>
      <Row title="Action" fetchUrl={requests.fetchActionMovies}></Row>
      <Row title="Thriller" fetchUrl={requests.fetchThrillerMovies}></Row>
      <Row title="Drama" fetchUrl={requests.fetchDramaMovies}></Row>
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies}></Row>
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies}></Row>
      <Link className="nav-link" to="/movie/">
        Movie
      </Link>
    </div>
  );
}

export default Home;
