import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const signupUser = async () => {
    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      alert("Signup Successful");

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert("Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={signupUser}>
          Sign Up
        </button>

        <p>
          Already have account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;