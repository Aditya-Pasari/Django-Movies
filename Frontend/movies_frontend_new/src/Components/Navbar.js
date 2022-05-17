import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="white_text">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/movie/">
            Movie
          </Link>
          <Link className="nav-link" to="/search_movie/">
            Search Movie
          </Link>
          <Link className="nav-link" to="/login/">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
