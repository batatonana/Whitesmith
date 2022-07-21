import "../index.css";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4000", { headers: {
      Authorization : token,
    }}).then(res =>{
      navigate("/")
    }).catch(err =>{
      console.log(err)
    })
})


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", {username, password}).then(user => {
    localStorage.setItem('token', user.data.token)
    navigate('/')
    }).catch(err =>{
      console.log(err);
    })
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Login</h1>
      <form className="wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
