import React from "react";
import "../css/Banner.css";

function Banner() {
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("./banner.webp")`,  // For link, use : backgroundImage: `url(https://wallpaperaccess.com/full/314923.png)`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
