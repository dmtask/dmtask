import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

require('dotenv').config();

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        console.log('Login with Passwort: ', password);
    }

    return (
        <form>
            <input type="password" value={password} onChange={e => {setPassword(e.target.password);}} placeholder="Passwort" />
            <button onClick={postLogin}>Login</button>
        </form>
    );
}

export default Login;