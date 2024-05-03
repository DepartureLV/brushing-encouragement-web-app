import React, { useState, useEffect } from "react";
import "./App.css";
import Streak from "./components/Streak";
import Star from "./components/Star";
import Timer from "./components/Timer";

function App() {
// Use States
  const [streak, setStreak] = useState(0);
  const [star, setStar] = useState(0);

// Use Effects
  useEffect (() => {
    setStreak(getStreak());
    getStar();
  }, []);

// Handle functions
  //test function
  function getStreak() {
    let score = 30;
    return score;
  }

  function getStar() {
    let star = 90;
    setStar(star);
  }


// Return
  return (
    <>
      <div>
      </div>
      <Streak className="streak" streakScore={streak}/>
      <Star className="star" starScore={star}/>
      <>
      <Timer/>
      </>
    </>
  )
}

export default App
