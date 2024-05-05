import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";
import Modal from "./components/Modal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  // Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // Use Effects
  useEffect (() => {
    setStreakScore(getStreakScore());
    getStarScore();
    setIsLoggedIn();
    handleLogin();
  }, []);

  useEffect  (() => {
    handleModal()
  },[isLoggedIn])
  
  // Handle functions

  async function handleLogin() {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST"
    });
    const data = await response.text();
    console.log(data);
  }

  async function getStreakScore() {
    const response = await fetch (`${BASE_URL}/score/:id`, {method: "GET"});
    const score = await response.json();
    return score.streakScore;
  }
  
  async function getStarScore() {
    const response = await fetch (`${BASE_URL}/score/:id`, {method: "GET"});
    const score = await response.json();
    setStarScore(score.starScore);
  }

  function handleModal(){
    return !isLoggedIn ? <Modal toggle = {() => setIsLoggedIn(true)}/>: <> </>
  }
  
  
  // Return
  return (
    <>
      <div>
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      {handleModal()}
      <Timer/>
      </div>
    </>
  )
}

export default App
