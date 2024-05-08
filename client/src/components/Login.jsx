import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = (props) => {
  // USE STATE
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const { token, message } = data;

    if (token) {
      sessionStorage.setItem("token", token);
      alert(message);
      navigate("/dashboard");
    } else {
      alert(message);
    }

    // if (data.isNewUser === true) {
    //   const newScoresResponse = await fetch(`${BASE_URL}/scores/${id}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const scoresResponseData = await newScoresResponse.json();
    // }
    // if (data.isLoggedIn === true) toggle();
  }

  return (
    <dialog ref={dialogRef} id="modal">
      <div className="modal-content">
        <h2>Enter your credentials.</h2>
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
          <button type="submit">Login/Sign Up</button>
        </form>
      </div>
    </dialog>
  );
};

export default Login;
