import { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Leaderboard = () =>{
    //STATE
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(()=>{
        handleGetLeaderboard();
    },[]);

    //HANDLER 
    async function handleGetLeaderboard(){
        const response = await fetch (`${BASE_URL}/leaderboard/`, {method: "GET"});
        const data = await response.json();
        console.log(data)
        setLeaderboard(data);
    }
    return (
        <>
        <table>
            <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Streak</th>
                <th>Stars</th>
            </tr>
            {leaderboard.map((entry, index) => {
                return <tr>
                    <td>{index + 1}</td>
                    <td>{entry.user_id}</td>
                    <td>{entry.streak_score}</td>
                    <td>{entry.star_score}</td>
                </tr>
            })}
        </table>
        </>
    )
}


export default Leaderboard;