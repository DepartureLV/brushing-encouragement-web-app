import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = (props) => {
  // USE STATE
  // login
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const navigate = useNavigate();

  const dialogRef = useRef(null);

  async function handleLogin(e) {
    e.preventDefault();
    const userCredentials = {
      user_email: userEmail,
      password: password,
    };

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    const { token, message, id } = data;

    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", id);
      alert(message);
      navigate("/dashboard");
    } else {
      alert(message);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    const userCredentials = {
      user_email: newUserEmail,
      password: newPassword,
    };

    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    const { message } = data;

    alert(message);
    setIsSignup(false);
  }

  return (
    <dialog ref={dialogRef} id="modal">
      <div className="modal-content">
        <h2>Welcome to Brush Buddy</h2>
        {!isSignup ? (
          <form onSubmit={handleLogin}>
            <input
              id="E-mail"
              type="text"
              placeholder="E-mail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              id="Password"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <input
              id="E-mail"
              type="text"
              placeholder="E-mail"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <input
              id="Password"
              type="text"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </form>
        )}

        <button onClick={() => setIsSignup((prev) => !prev)}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </div>
    </dialog>
  );
};

export default Login;
