import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import "../App.css";
import axios from "../axios";

function Login() {

    const [state, setState] = useState([]);

    //When Row loads on screen, we need to make a request to fetch the movies.
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get("http://127.0.0.1:8000/api/movie-read-genre/Thriller/10000");
            setState(request.data.slice(0, 50));
            return request;
        }
        fetchData();
    }, []); // Empty [] means only run this code once when Row is loaded. Then, never run it. If [movies] is there, then it will run everytime 'movies' changes its value.
    //  Thus, this creates dynamic nature.



    console.log(state)
    return (
        <div>
            <h2>This is Login PAGE. But Not going. s</h2>
            <div className="centered">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Movie ID</th>
                            <th>Name</th>
                            <th>Actors List</th>
                            <th>Release Date</th>
                            <th>Genres</th>
                            <th>Poster</th>
                            <th>Ratings</th>
                            <th>Ratings Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.map(m =>
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.name}</td>
                                    <td>{m.actors}</td>
                                    <td>{m.release_date}</td>
                                    <td>{m.genres}</td>
                                    <td><img src={m.poster_path} height='150px' onError={(e) => { e.target.onerror = null; e.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png" }} /> </td>
                                    <td>{m.ratings}</td>
                                    <td>{m.ratings_count}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    );
}

export default Login;
