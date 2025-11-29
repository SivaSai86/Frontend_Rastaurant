import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import "../styles/login.css";
const Login = (props) => {
  const { showWelcomeHandler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErr("");
    setSuccessMessage("");
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
        setSuccessMessage("Login successful! Redirecting...");
        localStorage.setItem("vendorToken", data.token);
        setEmail("");
        setPassword("");
        setTimeout(() => showWelcomeHandler(), 1500);
      } else {
        setErr(data.message || "Login failed");
      }
    } catch (error) {
      console.error("login failed: ", error);
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
        {err && <div className="errorMessage">{err}</div>}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
        <div className="btnsubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
