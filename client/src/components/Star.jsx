import React, { useState } from "react"
import "./Star.css"

function Star({starScore}) {
    //display star score
    return (
      <>
        <div>
          <h4>⭐ {starScore}</h4>
        </div>
      </>
    )
  }
  
  export default Star
  