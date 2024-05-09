import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Header from "./components/Header";

import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Timer />
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
