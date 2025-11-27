import React, { useState } from "react";

import { API_Path } from "../../data/apiPath";

import "../styles/register.css";

const Register = (props) => {
  const { showLoginHandler } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_Path}vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("vendor Register successful");
        setEmail("");
        setPassword("");
        setUsername("");
        showLoginHandler();
      }
    } catch (error) {
      console.error("registration failed: ", error);
      alert("vendor Register failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <br />

        <div>
          <label>UserName</label>
          <input
            name="username"
            type="text"
            placeholder="Enter Your UserName"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
