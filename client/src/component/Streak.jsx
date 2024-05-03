import React, { useState } from "react"
import "./Streak.css"

function Streak({streakScore}) {
    //display streak score
  
    return (
      <>
        <div>
          <H2>{streakScore}</H2>
        </div>
      </>
    )
  }
  
  export default Streak
  