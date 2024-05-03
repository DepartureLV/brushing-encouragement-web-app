import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";

function App() {
// Use States
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);

// Use Effects
  useEffect (() => {
    setStreakScore(getStreakScore());
    getStarScore();
  }, []);

// Handle functions
  //test function
  function getStreakScore() {
    let score = 30;
    return score;
  }

  function getStarScore() {
    let star = 90;
    setStar(star);
  }


// Return
  return (
    <>
      <div>
      </div>
      <Streak className="streak" streakScore={streakScore}/>
      <Star className="star" starScore={starScore}/>
      <>
      <Timer/>
      </>
    </>
  )
}

export default App
