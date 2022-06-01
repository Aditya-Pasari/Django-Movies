import React from 'react'
import { useState } from "react";
import axios from "../../axios";


function DeleteMovie() {
    const [movieID, setMovieID] = useState();


    function showDiv(request, div_element_id, p_element_id) {
        document.getElementById(p_element_id).innerHTML = request.data.message;
        if (request.data.message_type === 'success') {
            document.getElementById(div_element_id).classList.remove('message-error')
            document.getElementById(p_element_id).classList.remove('fa-times-circle')
            document.getElementById(div_element_id).classList.add('message-success')
            document.getElementById(p_element_id).classList.add('fa-check')
        }
        if (request.data.message_type === 'error') {
            document.getElementById(div_element_id).classList.remove('message-success')
            document.getElementById(p_element_id).classList.remove('fa-check')
            document.getElementById(div_element_id).classList.add('message-error')
            document.getElementById(p_element_id).classList.add('fa-times-circle')
        }

    }


    const handleSubmit = (event) => {
        event.preventDefault();


        async function fetchData() {
            event.preventDefault();
            var url = "/api/movie-delete/" + movieID
            console.log(url)
            const request = await axios.delete(url);

            showDiv(request, 'delete_single_movie', 'delete_single_movie_message')
            return request;

        }
        fetchData();

    };

    const handleSubmitDeleteAll = (event) => {

        async function fetchData() {
            event.preventDefault();
            var url = "/api/movie-delete-all/"
            const request = await axios.delete(url);

            showDiv(request, 'delete_all_movies', 'delete_all_movies_message')
            return request;

        }
        fetchData();

    };





    return (
        <div class="row">

            <div class="col">
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
                </div>
                <div className="response_message" id="delete_single_movie">
                    <h5 id="delete_single_movie_message" className='fa'>  </h5>
                </div>

            </div>
            <div class="col">
                <div>
                    <h2>Delete All the Movies</h2>
                    <button type="submit" class="btn btn-primary submit_button" onClick={handleSubmitDeleteAll}>Submit</button>
                </div>
                <div className="response_message" id="delete_all_movies">
                    <h5 id="delete_all_movies_message" className='fa'>  </h5>
                </div>


            </div>
            <hr />
        </div>
    )
}

export default DeleteMovie