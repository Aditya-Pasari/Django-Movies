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
  // navbar-light bg-light
  return (
    <div>
      <nav className="">


        <div class="nav_custom">
          <ul className="nav_list_item_ul">
            <Link className=" nav_list_item-brand " to="/" >
              <img className="nav_logo " src="https://images.creativemarket.com/0.1.0/ps/7414066/600/400/m2/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=50e3d37c1ab493df98baf6eb75f2a430&fmt=webp" />
            </Link>
            <li ><Link className="nav_list_item" to="/">
              Home
            </Link></li>

            <li ><Link className="nav_list_item" to="/crud_operations/">
              CRUD
            </Link></li>
            <li><Link className="nav_list_item" to="/search_movie/">
              Search Movie
            </Link></li>

            <li><Link className="nav_list_item " to="/api/">
              API
            </Link></li>

            {user ? (<li className=""><span className="nav_list_item_right">
              Hello {user.username}
            </span></li>) : null}

            {!user ? (<li><Link className="nav_list_item_right" to="/login/">
              Login
            </Link></li>) : null}
            {user ? (<li ><Link className="nav_list_item_right" to="/" onClick={logoutUser}>
              Logout
            </Link></li>) : null}
          </ul>
        </div>
      </nav >
    </div >
  );
}

export default Navbar;
