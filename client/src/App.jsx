import React, { useState, useEffect } from "react"
import "./App.css"
import Streak from "./Streak"
import Star from "./Star"

function App() {
// Use States
  const [streak, setStreak] = useState(0);
  const [star, setStar] = useState(0);

// Use Effects
  useEffect = (() => {
    getStreak();
    getStar();
  }, []);

// Handle functions
  // async function getStreak() {
  //   const streak = await fetch('endpoint');//endpoint to get from score table column streak_score where id =user_id
  //   setStreak(streak);
  // }

  // async function getStar() {
  //   const star = await fetch('endpoint');//endpoint to get from score table column star_score where id =user_id
  //   setStar(star);
  // }

// Return
  return (
    <>
      <div>
      </div>
      <Streak className="streak" streakScore={streak}/>
      <Star className="star" starScore={star}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
