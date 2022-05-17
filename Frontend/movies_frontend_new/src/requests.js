const requests = {
  fetchLatestTopMovies: "http://127.0.0.1:8000/api/movie-read-top-latest-year/",
  fetchComedyMovies: "http://127.0.0.1:8000/api/movie-read-genre/Comedy/20000",
  fetchActionMovies: "http://127.0.0.1:8000/api/movie-read-genre/Action/20000",
  fetchThrillerMovies:
    "http://127.0.0.1:8000/api/movie-read-genre/Thriller/20000",
  fetchDramaMovies: "http://127.0.0.1:8000/api/movie-read-genre/Drama/20000",
  fetchRomanceMovies:
    "http://127.0.0.1:8000/api/movie-read-genre/Romance/20000",
  fetchHorrorMovies: "http://127.0.0.1:8000/api/movie-read-genre/Horror/20000",
};

export default requests;
