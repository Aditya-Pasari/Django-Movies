import React, { useState, useEffect } from "react";
import MoviePopup from "./MoviePopup";
import Modal from './Modal';
import axios from "../axios";
import "../css/Row.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [movieClicked, setMovieClicked] = useState('');

  const [openModal, setOpenModal] = useState(false);


  const handleButton = (e) => {
    setMovieClicked({
      'name': e.currentTarget.getAttribute('movie_name'),
      'actors': e.currentTarget.getAttribute('actors'),
      'poster_path': e.currentTarget.getAttribute('src'),
      'genres': e.currentTarget.getAttribute('genres'),
      'release_date': e.currentTarget.getAttribute('release_date'),
      'ratings_count': e.currentTarget.getAttribute('ratings_count'),
      'ratings': e.currentTarget.getAttribute('ratings'),
    })
    setButtonPopup(true)
  }

  const openModalFunc = (e) => {
    setMovieClicked({
      'name': e.currentTarget.getAttribute('movie_name'),
      'actors': e.currentTarget.getAttribute('actors'),
      'poster_path': e.currentTarget.getAttribute('src'),
      'genres': e.currentTarget.getAttribute('genres'),
      'release_date': e.currentTarget.getAttribute('release_date'),
      'ratings_count': e.currentTarget.getAttribute('ratings_count'),
      'ratings': e.currentTarget.getAttribute('ratings'),
    })
    setOpenModal(true)
  }




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
    <>
      <div className="row">
        <h2>{title}</h2>

        <div className="row_posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row_poster"
              src={movie.poster_path}
              alt={movie.name}
              // onClick={handleButton}
              onClick={openModalFunc}

              movie_name={movie.name}
              actors={movie.actors}
              release_date={movie.release_date}
              genres={movie.genres}
              ratings={movie.ratings}
              ratings_count={movie.ratings_count}


            />
          ))}

        </div>


      </div>
      <div>
        <Modal trigger={openModal} setTrigger={setOpenModal} movieClicked={movieClicked} > </Modal>


        <MoviePopup trigger={buttonPopup} setTrigger={setButtonPopup} movieClicked={movieClicked} />

      </div>
    </>
  );
}

export default Row;
