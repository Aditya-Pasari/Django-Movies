import React from 'react'
import { useState } from "react";
import axios from "../../axios";
import "../../css/CRUD.css";
import Modal from '../Modal';


function ReadMovie() {

    const [movieID, setMovieID] = useState();
    const [movieClicked, setMovieClicked] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();


        async function fetchData() {
            event.preventDefault();
            var url = "/api/movie-read/" + movieID
            console.log(url)
            const request = await axios.get(url);
            console.log(request.data)
            setMovieClicked(request.data);
            return request;

        }
        fetchData();

        openModalFunc();

    };





    const openModalFunc = () => {

        setOpenModal(true)
    }







    return (
        <div>
            <h2>Read a Movie by Key</h2>
            <form className="search-form" onSubmit={handleSubmit}>
                <input name="id"
                    type="number"
                    onChange={(e) => setMovieID(e.target.value)}
                    placeholder="Enter Movie ID"
                />
                <button type="submit" class="btn btn-primary submit_button">Submit</button>
            </form>
            <hr />
            <Modal trigger={openModal} setTrigger={setOpenModal} movieClicked={movieClicked} > </Modal>
        </div>
    )
}

export default ReadMovie