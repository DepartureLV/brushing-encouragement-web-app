import React, { useState } from "react"
import "./Streak.css"

function Streak({streakScore}) {
    //display streak score
    return (
      <>
        <div>
          <h4>🦷 {streakScore}</h4>
        </div>
      </>
    )
  }
  
  export default Streak
  