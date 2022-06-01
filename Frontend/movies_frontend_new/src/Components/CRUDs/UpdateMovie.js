import React from 'react'
import { useState } from "react";

import axios from "../../axios";

function UpdateMovie(props) {
    console.log(props)
    const [inputs, setInputs] = useState({
        'id': props.movie.id,
        'name': props.movie.name,
        'actors': props.movie.actors,
        'release_date': props.movie.release_date,
        'poster_path': props.movie.poster_path,
        'genres': props.movie.genres,
        'ratings': props.movie.ratings,
        'ratings_count': props.movie.ratings_count,
    });

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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        async function fetchData() {

            var url = "/api/movie-update/" + inputs.id;
            const request = await axios.put(url, inputs);
            console.log(request.data)
            console.log(request.data.message)
            showDiv(request, 'create_movie_single', 'create_movie_single_message');
            return request;

        }
        fetchData();

    };

    console.log(props)
    return (
        <div>
            <h2>Update a Movie by Key</h2>
            <form className="search-form update_movie_form" onSubmit={handleSubmit}>
                <div class="form-group">
                    <input type="number" required name="id" class="form-control" aria-describedby="emailHelp" placeholder="Enter Movie ID"
                        value={inputs.id || ""} onChange={handleChange} />
                </div>

                <div class="form-group">
                    <input type="text" name="name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Movie name"
                        value={inputs.name || ""} onChange={handleChange} />
                </div>

                <div class="form-group">

                    <input type="text" name="actors" class="form-control" aria-describedby="emailHelp" placeholder="Enter Actors"
                        value={inputs.actors || ""} onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="text" name="release_date" class="form-control" placeholder="Enter Release Date" value={inputs.release_date || ""} onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="text" name="genres" class="form-control" aria-describedby="emailHelp" placeholder="Enter Genre"
                        value={inputs.genres || ""} onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="text" name="poster_path" class="form-control" aria-describedby="emailHelp" placeholder="Enter Poster Path"
                        value={inputs.poster_path || ""} onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="number" name="ratings" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating"
                        value={inputs.ratings} onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="number" name="ratings_count" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating Count"
                        value={inputs.ratings_count} onChange={handleChange} />
                </div>

                <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
            <hr />
        </div>
    )
}

export default UpdateMovie

