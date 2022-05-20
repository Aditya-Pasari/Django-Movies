import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'

import AuthContext from "./context/AuthContext";

function Navbar() {

  const [show, handleShow] = useState(false);
  let { user, logoutUser } = useContext(AuthContext)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        handleShow(true);
      } else handleShow(false);
    });
    //return () => {                                        Not working for w/e reason. Check later
    //  window.removeEventListener("scroll");
    // };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"} `}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand nav__logo" to="/" >
          <img className="nav_logo" src="https://images.creativemarket.com/0.1.0/ps/7414066/600/400/m2/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=50e3d37c1ab493df98baf6eb75f2a430&fmt=webp" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/crud_operations/">
            CRUD
          </Link>
          <Link className="nav-link" to="/search_movie/">
            Search Movie
          </Link>
          {!user ? (<Link className="nav-link" to="/login/">
            Login
          </Link>) : null}
          {user ? (<Link className="nav-link" to="/" onClick={logoutUser}>
            Logout
          </Link>) : null}

          <Link className="nav-link" to="/api/">
            API
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
