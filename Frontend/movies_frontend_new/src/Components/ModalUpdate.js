import React from 'react'
import '../css/ModalUpdate.css'
import { useState } from "react";
import axios from "../axios";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


function ModalUpdate(props) {


    console.log(props)

    return (
        <Dialog open={props.openModal} className="modalUpdateoverlay">
            <DialogTitle>
                <div>{props.movie.name}</div>
            </DialogTitle>
            <DialogContent className="modalUpdateContainer"  >
                {props.children}
                <div >
                    <p className="close-btn_modal" onClick={() => props.setOpenModal(false)}>X</p>
                </div>
            </DialogContent>



        </Dialog>



    );
}

export default ModalUpdate