import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <div className="main-container">
      <Timer/>
      <Leaderboard/>
    </div>
  )
}

export default App
