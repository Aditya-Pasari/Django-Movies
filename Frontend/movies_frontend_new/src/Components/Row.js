import React, { useState, useEffect } from "react";

import axios from "../axios";
import "../css/Row.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  //When Row loads on screen, we need to make a request to fetch the movies.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.slice(0, 50));
      return request;
    }
    fetchData();
  }, [fetchUrl]); // Empty [] means only run this code once when Row is loaded. Then, never run it. If [movies] is there, then it will run everytime 'movies' changes its value.
  //  Thus, this creates dynamic nature.

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row_poster"
            src={movie.poster_path}
            alt={movie.name}
          />
        ))}
        <h4>Several row posters</h4>
      </div>
    </div>
  );
}

export default Row;
