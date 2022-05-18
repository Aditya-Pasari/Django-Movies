import React from 'react'
import '../css/MoviePopup.css'


function MoviePopup(props) {

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>{props.movieClicked['movie_name']}</h2>

                <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>

            </div>
        </div>
    ) : "";
}

export default MoviePopup