import { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Leaderboard = () => {
  //STATE
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    handleGetLeaderboard();
  }, []);

  //HANDLER
  async function handleGetLeaderboard() {
    const response = await fetch(`${BASE_URL}/leaderboard/`, { method: "GET" });
    const data = await response.json();
    setLeaderboard(data);
  }
  return (
    <div className="table-container">
      <h2>Leaderboard</h2>
      <table className="table">
        <tbody>
          <tr>
            <th className="top-row">Rank</th>
            <th className="top-row">User</th>
            <th className="top-row">Streak</th>
            <th className="top-row">Stars</th>
          </tr>

          {leaderboard.map((entry, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.user_id}</td>
                <td>{entry.streak_score}</td>
                <td>{entry.star_score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
