import "./App.css";
import React from "react";
import Home from "./Components/Home";
import CRUD_Operations from "./Components/CRUD_Operations";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import API_list from "./Components/API_list";
import SearchMovie from "./Components/SearchMovie";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/crud_operations/" component={CRUD_Operations} />
          <Route exact path="/search_movie/" component={SearchMovie} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/api/" component={API_list} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
