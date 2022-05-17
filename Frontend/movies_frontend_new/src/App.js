import "./App.css";
import React from "react";
import Home from "./Components/Home";
import Movie from "./Components/Movie";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import SearchMovie from "./Components/SearchMovie";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/movie/" component={Movie} />
          <Route exact path="/search_movie/" component={SearchMovie} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
