import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { createUser, getUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [isShowSignUpTip, setShowSignUpTip] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === "") {
      return console.error("field is empty");
    }
    try {
      const userData = await getUser(username);
      login(userData);
      navigate("/tasks");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        setShowSignUpTip(true);
      }
      console.error("Error with login:", err);
    }
  }

  async function handleSignUp() {
    if (username.trim() === "") {
      return console.error("field is empty");
    }
    try {
      const userData = await createUser(username);
      login(userData);
      navigate("/tasks");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error with login:", err);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignIn}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setShowSignUpTip(false);
          }}
          placeholder="Please enter your login"
        />
        <div className="login-buttons">
          <button type="submit">Sign In</button>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
      {isShowSignUpTip && (
        <div className="signup-tip">
          <div>That account doesn't exist</div>
          <button onClick={handleSignUp}>Create {username} account</button>
        </div>
      )}
    </div>
  );
}
