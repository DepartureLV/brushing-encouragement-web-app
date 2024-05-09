import React, { useState, useEffect } from "react";
import "./Clock.css";
import GifDisplay from "./GifDisplay";
import ToothDisplay from "./ToothDisplay";
import Flossing from "./Flossing";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Clock({ updateStreakScore, updateStarScore, starScore }) {
  const totalSeconds = 120;
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [flossingDisplay, setFlossingDisplay] = useState(false);

  useEffect(() => {
    handleCountdown();
  }, [isRunning]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      updateStreakScore();
      updateStarScore();
    }
  }, [remainingSeconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setRemainingSeconds(totalSeconds);
    handleStart();
  };

  const handleCountdown = () => {
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        setRemainingSeconds((currentSeconds) => {
          if (currentSeconds > 0) {
            return currentSeconds - 1;
          }
          setIsRunning(false);
          clearInterval(countdown);
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  };

  const displayTimerString = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="timer-container">
        <div id="countdown">{displayTimerString(remainingSeconds)}</div>
        <div className="timerButtonsContainer">
          <button
            className="timerButtons"
            onClick={remainingSeconds === 0 ? handleReset : handleStart}
          >
            Brush
          </button>
          <button
            className="timerButtons"
            onClick={() => {
              setFlossingDisplay(true);
            }}
          >
            Floss
          </button>
          {flossingDisplay ? <Flossing setFlossingDisplay={setFlossingDisplay} /> : <></>}
        </div>
      </div>

      <ToothDisplay starScore={starScore} />

      <GifDisplay remainingSeconds={remainingSeconds} isRunning={isRunning} />
    </>
  );
}

export default Clock;
