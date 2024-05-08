import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";
import { BRENDA } from "./dummy-data/fixture-data";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const {user_email, password, id} = BRENDA;

function App() {
  // Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [id, setID] = useState(BRENDA.id); // useContext
  
  // WE HAVE TO MAKE LOGIN COMPONENT FETCH THROUGH AUTH ENDPOINT AND GET ID BACK.
  // #############################################################################
  // #############################################################################

//HANDLER FUCNTIONS
  async function handleSetScores() {
    const scores = await getScores();

    setStreakScore(scores.streakScore);
    setStarScore(scores.starScore);
  }

  async function getScores() {
    const response = await fetch (`${BASE_URL}/scores/${id}`, {method: "GET"});
    const scores = await response.json();
    return scores;

  }

    //update scores
  async function updateStreakScore() {
    const resStreak = await fetch(`${BASE_URL}/streakScore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const newStreakScore = await resStreak.json();
    const newStreak = newStreakScore[0].streakScore;
    setStreakScore(newStreak);
  }
  
  async function updateStarScore() {

    const resStar = await fetch(`${BASE_URL}/starScore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const newStarScore = await resStar.json();
    const newStar = newStarScore[0].starScore;
    setStarScore(newStar);
  }

  // Return
  return (
    <>
      <div className="scores-section">
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      </div>
      <Timer updateStreakScore={updateStreakScore} updateStarScore={updateStarScore}/>
    </>
  )
}

export default App
