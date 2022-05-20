import React from 'react'
import { useState } from "react";
import axios from "../../axios";
import "../../css/CRUD.css";
import CreateMovieSingle from "./CreateMovieSingle";
import CreateMovieExcel from "./CreateMovieExcel";


function CreateMovie() {





    /*#######################################################################
    ########################### For adding single file  ###################
    #######################################################################*/




    /*#######################################################################
    ###################### END OF For adding single file  ##################
    #######################################################################*/

    /*#######################################################################
   ########################### For adding Excel file  ###################
   #######################################################################*/



    /*#######################################################################
    ###################### END OF For adding Excel file  ##################
    #######################################################################*/



    return (
        <div class="row">
            <h2>Create a Movie  </h2>

            <div className="col">
                <h4>Add a single Movie</h4>
                <CreateMovieSingle />


                <br /><br />
            </div>
            <div className="col">
                <CreateMovieExcel />
            </div>
            <hr />
        </div>

    )
}

export default CreateMovie