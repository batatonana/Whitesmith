import "../index.css";
import React from "react";

const Login = () => {
    return(
        <div className="login">
            <h1 className="loginTitle">Login</h1>
            <div className="wrapper">
                <input type="text" placeholder="Username"/>
                <input type="text" placeholder="Password"/>
                <button className="submit">Login</button>
            </div>
        </div>
    )
}

export default Login