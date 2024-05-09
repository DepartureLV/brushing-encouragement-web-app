import React, { useState } from "react";
import "./Streak.css";

function Streak(props) {
  const { streakScore, className } = props;
  //display streak score
  return (
    <>
      <div className={className}>
        <h4>🦷 Streak Score: {streakScore}</h4>
      </div>
    </>
  );
}

export default Streak;
