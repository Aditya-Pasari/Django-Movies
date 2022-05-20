import React from 'react'
import { useState } from "react";
import axios from "../../axios";

function CreateMovieExcel() {

    const [selectedFile, setSelectedFile] = useState('');

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

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };



    const onFileUpload = () => {

        async function fetchData() {
            const formData = new FormData();

            formData.append(
                "myFile",
                selectedFile,
                selectedFile.name
            );
            const request = await axios.post("http://127.0.0.1:8000/createMovieUsingExcelViaReact/", formData);
            console.log(request);
            showDiv(request, 'create_movie_excel', 'create_movie_excel_message');
            return request;
        }
        fetchData();


        //console.log(request[['PromiseResult']]);

    };
    return (
        <div>

            <div className="search-form create_movie_form">

                <h4>Add Movies via Excel Sheet</h4>
                <p>Upload Excel File</p>
                <input type="file" name="myFile" onChange={onFileChange} />
                <button type="submit" class="btn btn-primary submit_button" onClick={onFileUpload}>Submit</button>
            </div>
            <div className="response_message" id="create_movie_excel">
                <h5 id="create_movie_excel_message" className='fa'>  </h5>
            </div>
        </div>
    )
}

export default CreateMovieExcel