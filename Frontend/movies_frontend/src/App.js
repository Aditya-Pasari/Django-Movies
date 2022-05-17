import "./App.css";
// import Navigation from "./Navigation";
import { Home } from "./components/Home";
import { Movie } from "./components/Movie";
import Navbar from "./components/Navbar";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./requests";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>App Page</h1>

      <Banner />
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
    </div>
  );
}

export default App;
