import React from 'react'
import { useState } from "react";
import axios from "../../axios";


function DeleteMovie() {
    const [movieID, setMovieID] = useState();


    const handleSubmit = (event) => {
        event.preventDefault();


        async function fetchData() {
            event.preventDefault();
            var url = "http://127.0.0.1:8000/api/movie-delete/" + movieID
            console.log(url)
            const request = await axios.delete(url);
            console.log(request.data)
            return request;

        }
        fetchData();

    };





    return (
        <div>
            <h2>Delete a Movie by Key</h2>
            <form className="search-form" onSubmit={handleSubmit}>
                <input name="id"
                    type="number"
                    onChange={(e) => setMovieID(e.target.value)}
                    placeholder="Enter Movie ID"
                />
                <button type="submit" class="btn btn-primary submit_button">Submit</button>
            </form>
            <hr />
        </div>
    )
}

export default DeleteMovie