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
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
    //user authentication
  async function handleLogin() {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST"
    });
    const data = await response.text();
    console.log(data);
  }

  function handleModal(){
    return !isLoggedIn ? <Modal toggle = {() => setIsLoggedIn(true)}/>: <> </>
  }
  
    // read scores
function getStreakScore() {
   return 25;
}

function getStarScore() {
  setStarScore(75);
}


  async function getStreakScore() {
    const response = await fetch (`${BASE_URL}/scores/:id`, {method: "GET"});
    const score = await response.json();
    return score.streakScore;
  }
  
  async function getStarScore() {
    const response = await fetch (`${BASE_URL}/scores/:id`, {method: "GET"});
    const score = await response.json();
    setStarScore(score.starScore);
  }

    //update scores
    function addToStreak(newStreak) {
      setStreakScore(newStreak);
    }

    function addToStar(newStar) {
      setStarScore(newStar);
    }

  // async function updateStreakScore() {
  //   await fetch(`${BASE_URL}/streakScore/:id`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //        num: newStreakScore,
  //     }),
  //   });
  // }
  
  // Return
  return (
    <>
      <header>Brush Buddy</header>
      <div className="scores-section">
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      </div>
      <Timer addToStreak={addToStreak} addToStar={addToStar} oldStreakScore={streakScore} oldStarScore={starScore}/>
      {handleModal()}
    </>
  )
}

export default App
