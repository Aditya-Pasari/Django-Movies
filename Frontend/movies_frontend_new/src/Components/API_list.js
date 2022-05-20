import React from 'react'
import { Table } from "react-bootstrap";

import "../App.css";
import { useContext } from 'react'
import AuthContext from "./context/AuthContext";

function API_list() {

    let { loginUser } = useContext(AuthContext)
    let { user } = useContext(AuthContext)
    console.log(user)
    return (
        <div className='centered'>
            {(user) && (<p>Hello {user.username}</p>)}
            <h2>List of API's</h2>
            <h2>Base URL: http:/127.0.0.1:8000/</h2>
            <Table striped bordered hover id="sortMe">
                <thead>
                    <tr>
                        <th >Function</th>
                        <th>Link</th>
                        <th>Notes</th>

                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td> Get all data </td>
                        <td>/api/get-all</td>
                        <td>Returns entire database</td>
                    </tr>

                    <tr>
                        <td>Create</td>
                        <td>/api/movie-create/</td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Read</td>
                        <td>/api/movie-read/</td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Update</td>
                        <td>/api/movie-update/</td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Delete</td>
                        <td>/api/movie-delete/</td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Search Movies</td>
                        <td>/api/movie-search/movie_name/actor_name/release_date/genres/ratings/ratings_count /</td>
                        <td>Use "None" for empty values</td>
                    </tr>


                </tbody>
            </Table>
        </div>
    )
}

export default API_list