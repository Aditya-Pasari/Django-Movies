import React from 'react'
import '../css/Modal.css'



function Modal(props) {


    return (props.trigger) ? (
        <div className='overlay'>
            <div className='modalContainer'>
                <img src={props.movieClicked.poster_path} className="modal_img" />

                <div className='content'>
                    <p><b>Movie</b> : {props.movieClicked.name} </p>
                    <p><b>Actors</b> : {props.movieClicked.actors} </p>
                    <p> <b> Genre </b> : {props.movieClicked.genres} </p>
                    <p> <b>Release</b>  : {props.movieClicked.release_date} </p>
                    <p> <b>Rating</b> : {props.movieClicked.ratings} </p>
                    <p> <b>No of votes</b> : {props.movieClicked.ratings_count} </p>
                </div>
                <div className='modalRight'>
                    <p className="close-btn" onClick={() => props.setTrigger(false)}>X</p>
                </div>



            </div>
        </div >
    ) : "";
}

export default Modal