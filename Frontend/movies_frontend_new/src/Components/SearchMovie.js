import React from "react";
import "../css/SearchMovie.css";
import { useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../axios";

import ModalUpdate from './ModalUpdate';
import UpdateMovie from './CRUDs/UpdateMovie';



function SearchMovie() {
    const [inputs, setInputs] = useState({
        'id': '',
        'movie_name': '',
        'actor_name': '',
        'release_date': '',
        'poster_path': '',
        'genres': '',
        'ratings': '',
        'ratings_count': '',
    });

    const [movies, setMovies] = useState([]);
    const [table_results, setTable_results] = useState(false);

    const [buttonPopup, setButtonPopup] = useState(false);
    const [movieClicked, setMovieClicked] = useState('');

    const [openModal, setOpenModal] = useState(false);


    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs((values) => ({ ...values, [name]: value }));
    };


    const modifyData = (data) => {
        if (data === '') return 'None'
        else return data.replaceAll(' ', '%20')
        //const new_data = data.replaceAll(' ', '%20')
        //return new_data
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(table_results)
        var x = movies ? "show" : "hidden";
        console.log(x);
        if (table_results == false) {
            setTable_results(true);
            console.log("In BOOLEAN")
        }

        async function fetchData() {

            var url = "/api/movie-search/"
            url += modifyData(inputs.movie_name) + '/';
            url += modifyData(inputs.actor_name) + '/';
            url += modifyData(inputs.release_date) + '/';
            url += modifyData(inputs.genres) + '/';
            url += modifyData(inputs.ratings) + '/';
            url += modifyData(inputs.ratings_count) + '/';
            console.log(url)
            const request = await axios.get(url);
            setMovies(request.data);
            //console.log(request.data)
            return request;

        }
        fetchData();

    };

    const handleUpdateButton = (e) => {
        setMovieClicked({
            'name': e.currentTarget.getAttribute('movie_name'),
            'id': e.currentTarget.getAttribute('id'),
            'actors': e.currentTarget.getAttribute('actors'),
            'poster_path': e.currentTarget.getAttribute('poster_path'),
            'genres': e.currentTarget.getAttribute('genres'),
            'release_date': e.currentTarget.getAttribute('release_date'),
            'ratings_count': e.currentTarget.getAttribute('ratings_count'),
            'ratings': e.currentTarget.getAttribute('ratings'),
        })
        setButtonPopup(true)
    };

    const openModalFunc = (e) => {
        setMovieClicked({
            'name': e.currentTarget.getAttribute('movie_name'),
            'id': e.currentTarget.getAttribute('id'),
            'actors': e.currentTarget.getAttribute('actors'),
            'poster_path': e.currentTarget.getAttribute('poster_path'),
            'genres': e.currentTarget.getAttribute('genres'),
            'release_date': e.currentTarget.getAttribute('release_date'),
            'ratings_count': e.currentTarget.getAttribute('ratings_count'),
            'ratings': e.currentTarget.getAttribute('ratings'),
        })
        setOpenModal(true)
    }

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const movie_id = event.currentTarget.getAttribute('movie_id')


        async function fetchData() {
            event.preventDefault();
            var url = "/api/movie-delete/" + movie_id
            console.log(url)
            const request = await axios.delete(url);

            return request;

        }
        fetchData();
        handleSubmit(event);

    };




    //////////////////////////////////////////////////////////////////////
    ////////// To Sort Table by clicking on Header - dont touch ///////////
    ///////////////////////////////////////////////////////////////////////

    if (table_results) {
        try {
            const table = document.getElementById('sortMe');
            // Query the headers
            const headers = table.querySelectorAll('th');

            // Loop over the headers
            [].forEach.call(headers, function (header, index) {
                header.addEventListener('click', function () {
                    // This function will sort the column
                    sortColumn(index);
                });
            });
            const tableBody = table.querySelector('tbody');
            const rows = tableBody.querySelectorAll('tr');



            const transform = function (index, content) {
                // Get the data type of column
                const type = headers[index].getAttribute('data-type');
                switch (type) {
                    case 'number_int':
                        return parseInt(content);
                    case 'number_float':
                        return parseFloat(content);
                    case 'release_year':
                        if (content == 'N/A') {
                            return 1000;
                        }
                        var release_year = content.split("-")[0];           //   This is for formatted data where location is removed
                        return parseInt(release_year);
                    case 'string':
                    default:
                        return content;
                }
            };



            const directions = Array.from(headers).map(function (header) {
                return '';
            });

            const sortColumn = function (index) {
                // Get the current direction
                const direction = directions[index] || 'asc';

                // A factor based on the direction
                const multiplier = (direction === 'asc') ? 1 : -1;

                const newRows = Array.from(rows);

                newRows.sort(function (rowA, rowB) {
                    const cellA = rowA.querySelectorAll('td')[index].innerHTML;
                    const cellB = rowB.querySelectorAll('td')[index].innerHTML;

                    const a = transform(index, cellA);
                    const b = transform(index, cellB);

                    switch (true) {
                        case a > b: return 1 * multiplier;
                        case a < b: return -1 * multiplier;
                        case a === b: return 0;
                    }
                });

                [].forEach.call(rows, function (row) {
                    tableBody.removeChild(row);
                });

                // Append new row
                newRows.forEach(function (newRow) {
                    tableBody.appendChild(newRow);
                });

                // Reverse the direction
                directions[index] = direction === 'asc' ? 'desc' : 'asc';

            };

        }
        catch (error) {
            console.error(error);
        }
    }
    //////////////////////////////////////////////////////////////////////
    ////////////////////// END OF SORT ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////


    return (
        <div >
            <section className="centered_small" >
                <div className="container mt-5">
                    <div className="sig">
                        <div className="form">
                            <h2 className="form-title">
                                Search Movie
                            </h2>
                            <form className="search-form" onSubmit={handleSubmit}>
                                <div class="form-group">

                                    <input type="text" name="movie_name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Movie name"
                                        value={inputs.movie_name || ""} onChange={handleChange1} />
                                </div>

                                <div class="form-group">

                                    <input type="text" name="actor_name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Actors"
                                        value={inputs.actor_name || ""} onChange={handleChange1} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="release_date" class="form-control" placeholder="Enter Release Date" value={inputs.release_date || ""} onChange={handleChange1} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="genres" class="form-control" aria-describedby="emailHelp" placeholder="Enter Genre"
                                        value={inputs.genres || ""} onChange={handleChange1} />
                                </div>
                                <div class="form-group">
                                    <input type="number" name="ratings" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating"
                                        value={inputs.ratings} onChange={handleChange1} />
                                </div>
                                <div class="form-group">
                                    <input type="number" name="ratings_count" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating Count"
                                        value={inputs.ratings_count} onChange={handleChange1} />
                                </div>



                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {" "}
            <br />

            <br />
            <br />
            <div className={table_results ? "centered show" : "centered hidden"}>

                <h3>Total Movies matched : {movies.length}</h3>
                <h2>Search Results are:</h2>
                <div >
                    <Table striped bordered hover id="sortMe">
                        <thead>
                            <tr>
                                <th data-type="number_int">Movie ID</th>
                                <th>Name</th>
                                <th>Actors List</th>
                                <th data-type="release_year">Release Date</th>
                                <th>Genres</th>
                                <th >Poster</th>
                                <th data-type="number_float">Ratings</th>
                                <th data-type="number_int">Ratings Count</th>
                                <th>Update Movie</th>
                                <th>Delete Movie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map(m =>
                                    <tr key={m.id}>
                                        <td>{m.id}</td>
                                        <td>{m.name}</td>
                                        <td><div className="small_cell">{m.actors}</div></td>
                                        <td>{m.release_date}</td>
                                        <td>{m.genres}</td>
                                        <td className="td_image_column"><div className="image_column"><img className="small_cell_image" src={m.poster_path} height='150px' onError={(e) => { e.target.onerror = null; e.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png" }} /></div> </td>
                                        <td>{m.ratings}</td>
                                        <td>{m.ratings_count}</td>
                                        <td onClick={openModalFunc} movie_id={m.id}
                                            movie_name={m.name}
                                            actors={m.actors}
                                            release_date={m.release_date}
                                            genres={m.genres}
                                            ratings={m.ratings}
                                            ratings_count={m.ratings_count}
                                            id={m.id}
                                            poster_path={m.poster_path}

                                        ><button class="button primary edit"> Update</button> </td>
                                        <td onClick={handleDeleteButton} movie_id={m.id}><button class="button primary delete"> Delete</button> </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                <ModalUpdate movie={movieClicked} openModal={openModal} setOpenModal={setOpenModal} >
                    <UpdateMovie movie={movieClicked} />
                </ModalUpdate>



            </div>


        </div >
    );
}

export default SearchMovie;
