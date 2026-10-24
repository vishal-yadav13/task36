import { useState } from "react";
import "./App.css";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
      }),
    });

    const data = await response.json();

    setRegisterMessage(data.message);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setLoginMessage("Login successful!");
    } else {
      setLoginMessage(data.message);
    }
  };

  const accessProtectedRoute = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoginMessage("Please login first");
      return;
    }

    const response = await fetch("http://localhost:5000/protected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    setLoginMessage(data.message);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setLoginMessage("Logged out successfully");
  };

  return (
    <div>
      <h1>JWT Authentication</h1>

      <h2>Register</h2>

      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <p>{registerMessage}</p>

      <hr />

      <h2>Login</h2>

      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{loginMessage}</p>

      <button onClick={accessProtectedRoute}>
        Access Protected Route
      </button>

      <br />
      <br />

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default App;