import "../index.css";
import React, { useState } from "react";

const Login = () => {
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const aux = {
            username: username,
            password: password,
          };
        console.log(aux)
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          body: JSON.stringify(aux),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
    
    

    return(
        <div className="login">
            <h1 className="loginTitle">Login</h1>
            <form className="wrapper" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={(e) => setUername(e.target.value)} value={username}/>
                <input type="password" name="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className="submit">Login</button>
            </form>
        </div>
    )
}

export default Login