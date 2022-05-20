import React from "react";

import { useState } from "react";

import "../App.css";
import axios from "../axios";

import { useContext } from 'react'
import AuthContext from "./context/AuthContext";

function Login() {

    const [inputs, setInputs] = useState({
        'username': '',
        'password': '',
    });

    let { loginUser } = useContext(AuthContext)
    let { user } = useContext(AuthContext)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };




    const login = () => {

        loginUser();
        async function sendData() {

            var url = "http://127.0.0.1:8000/api_login/";
            const request = await axios.post(url, inputs);
            console.log(request.token);
            return request;

        }
        sendData();

    }

    return (
        <div>
            <h2>This is Login PAGE. But Not going. s</h2>

            <div>
                {(user) && (<p>Hello {user.username}</p>)}

                <form onSubmit={loginUser}>
                    <span > Enter Username: </span>
                    <input type="text" name="username" onChange={handleChange} value={inputs.username} /> <br />
                    <span > Enter Password: </span>
                    <input type="password" name="password" onChange={handleChange} value={inputs.password} /><br />
                    <input type="submit" />
                </form>
            </div>

        </div>
    );
}

export default Login;
