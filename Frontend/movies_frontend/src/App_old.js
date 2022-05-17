import "./App.css";
import Row from "./Row";
import Banner from "./Banner";
// import Navigation from "./Navigation";
import { Home } from "./components/Home";
import { Navigation } from "./Navigation";
import { Movie } from "./components/Movie";

import requests from "./requests";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Navigation />  */}
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
            React JS Tutorial
          </h3>
          <Navigation />
          <Routes>
            <Route path="/" component={Home} exact />
            <Route path="/movie" component={Movie} exact />
          </Routes>
        </div>
      </BrowserRouter>

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
