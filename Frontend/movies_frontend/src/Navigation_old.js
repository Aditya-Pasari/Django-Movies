import React, { useEffect, useState } from "react";

import "./Navigation.css";

function Navigation() {
  const [show, handleShow] = useState(false);

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
      <img
        className="nav__logo"
        src="https://images.creativemarket.com/0.1.0/ps/7414066/580/387/m2/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=01c0e34a7a49aba80eeeee6e9703b8bc"
        alt="Site Logo"
      />

      <img
        className="login__logo"
        src="https://www.seekpng.com/png/full/138-1388103_user-login-icon-login.png"
        alt="Login Logo"
      />
    </div>
  );
}

export default Navigation;
