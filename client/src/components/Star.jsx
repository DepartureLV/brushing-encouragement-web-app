import React, { useState } from "react";
import "./Star.css";

function Star(props) {
  const { starScore, className } = props;
  //display star score
  return (
    <>
      <div className={className}>
        <h4>⭐ Star Score: {starScore}</h4>
      </div>
    </>
  );
}

export default Star;
