import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios"


const LoginForm = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For Signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", { username, password });

      try {
        const result = await axios.post("https://localhost:7024/api/Auth/login", {
          username: username,
          password: password
        })

        const token = result.data.token
        localStorage.setItem("token", token)
        console.log(localStorage.getItem("token"));

        location.replace("/")
      } catch {
        console.error("KUR")
      }

    } else {
      console.log("Signing up with:", { username, email, password });
    }
    closeModal();
  };

  return (
    <div className="login-form">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={!isLogin} // Required only for signup
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
      <div className="toggle-link">
        <span>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button
          type="button"
          className="link-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup here" : "Login here"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;




/*import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload or navigation
    console.log("Logging in with:", { email, password });

    // Perform your login logic here
    closeModal(); // Close the modal after successful login
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;*/
