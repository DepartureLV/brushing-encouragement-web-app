import Streak from "./Streak";
import Star from "./Star";
import Clock from "./Clock";
import { useEffect, useState } from "react";
import "./Timer.css";
import ToothDisplay from "./ToothDisplay";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Timer = () => {
  //STATES
  const [streakScore, setStreakScore] = useState(0);
  const [starScore, setStarScore] = useState(0);

  const id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    handleSetScores();
  }, []);

  useEffect(() => {
    console.log(streakScore, starScore);
  }, [streakScore, starScore]);

  //Handler
  async function handleSetScores() {
    const scores = await getScores();

    console.log("press");

    setStreakScore(scores.streakScore);
    setStarScore(scores.starScore);
  }

  async function getScores() {
    const response = await fetch(`${BASE_URL}/scores/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const scores = await response.json();
    return scores;
  }

  async function updateStreakScore() {
    const resStreak = await fetch(`${BASE_URL}/streakScore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const newStreakScore = await resStreak.json();
    const newStreak = newStreakScore[0].streakScore;
    setStreakScore(newStreak);
  }

  async function updateStarScore() {
    const resStar = await fetch(`${BASE_URL}/starScore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const newStarScore = await resStar.json();
    const newStar = newStarScore[0].starScore;
    setStarScore(newStar);
  }
  return (
    <div className=" timer-display">
      <Clock
        className="clockDisplay"
        updateStreakScore={updateStreakScore}
        updateStarScore={updateStarScore}
        starScore={starScore}
        handleSetScores={handleSetScores}
      />
      <div className="rightColumn">
        <div className="scores-section">
          <Streak className="streak" streakScore={streakScore} />
          <Star className="star" starScore={starScore} />
        </div>
        <ToothDisplay starScore={starScore} />
      </div>
    </div>
  );
};

export default Timer;
