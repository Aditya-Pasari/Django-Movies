import "./App.css";

import Banner from "./Components/Banner";
import Row from "./Components/Row";
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <h1 className="white_text">App Front Page</h1>
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
    </div>
  );
}

export default App;
