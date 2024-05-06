import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";
import Modal from "./components/Modal";
import { BRENDA } from "./dummy-data/fixture-data";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const {user_email, password, id} = BRENDA;

function App() {
  // Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // Use Effects
  useEffect (() => {
    handScoresOnMount();
  }, []);

  useEffect  (() => {
    handleModal()
  },[isLoggedIn])
  
  // Handle functions

  async function handleLogin() {
    console.error("Not yet implemented");
  }

  async function handScoresOnMount() {
    const scores = await getScores();

    setStreakScore(scores.streakScore);
    setStarScore(scores.starScore);
  }

  async function getScores() {
    const response = await fetch (`${BASE_URL}/score/${id}`, {method: "GET"});
    const scores = await response.json();
    return scores;
  }

  function handleModal(){
    return !isLoggedIn ? <Modal toggle = {() => setIsLoggedIn(true)}/>: <> </>
  }
  
  
  // Return
  return (
    <>
      <header>Brush Buddy</header>
      <div className="scores-section">
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      </div>
      <Timer/>
      {handleModal()}
    </>
  )
}

export default App
