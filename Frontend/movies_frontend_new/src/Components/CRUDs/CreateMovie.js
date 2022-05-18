import React from 'react'
import { useState, useEffect } from "react";
import axios from "../../axios";
import "../../css/CRUD.css";


function CreateMovie() {

    const [inputs, setInputs] = useState({
        'name': '',
        'actors': '',
        'release_date': '',
        'poster_path': '',
        'genres': '',
        'ratings': '',
        'ratings_count': '',
    });

    const [movies, setMovies] = useState([]);

    const [selectedFile, setSelectedFile] = useState('');

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    console.log(selectedFile);

    const onFileUpload = () => {


        const formData = new FormData();

        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile);

        axios.post("http://127.0.0.1:8000/createMovieUsingExcelViaReact/", formData);
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs((values) => ({ ...values, [name]: value }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        async function fetchData() {

            var url = "http://127.0.0.1:8000/api/movie-create/"
            const request = await axios.post(url, inputs);
            setMovies(request.data);
            console.log(request.data)
            return request;

        }
        fetchData();
    };






    return (
        <div>
            <h2>Create a Movie  </h2>
            <h4>Add a single Movie</h4>
            <div>
                <form className="search-form create_movie_form" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="text" required name="name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Movie name"
                            value={inputs.name || ""} onChange={handleChange} />
                    </div>

                    <div class="form-group">

                        <input type="text" required name="actors" class="form-control" aria-describedby="emailHelp" placeholder="Enter Actors"
                            value={inputs.actors || ""} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="text" required name="release_date" class="form-control" placeholder="Enter Release Date" value={inputs.release_date || ""} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="text" required name="genres" class="form-control" aria-describedby="emailHelp" placeholder="Enter Genre"
                            value={inputs.genres || ""} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="text" name="poster_path" class="form-control" aria-describedby="emailHelp" placeholder="Enter Poster Path"
                            value={inputs.poster_path || ""} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="number" required name="ratings" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating"
                            value={inputs.ratings} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="number" required name="ratings_count" class="form-control" aria-describedby="emailHelp" placeholder="Enter Greater than Rating Count"
                            value={inputs.ratings_count} onChange={handleChange} />
                    </div>



                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> <br /><br />
            </div>
            <div className="search-form create_movie_form">

                <h4>Add Movies via Excel Sheet</h4>
                <p>Upload Excel File</p>
                <input type="file" name="myFile" onChange={onFileChange} />
                <button type="submit" class="btn btn-primary submit_button" onClick={onFileUpload}>Submit</button>
            </div>
            <hr /></div>
    )
}

export default CreateMovie