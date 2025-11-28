import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import "../styles/login.css";
const Login = (props) => {
  const { showWelcomeHandler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_Path}vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("vendor Login successful");
        localStorage.setItem("vendorToken", data.token);
        setEmail("");
        setPassword("");
        showWelcomeHandler();
      }
    } catch (error) {
      console.error("login failed: ", error);
      alert("vendor Login failed");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={handlerSubmit}>
        <h3>Vendor Login</h3> <br />
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
