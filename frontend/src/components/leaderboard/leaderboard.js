import React from "react";
import { Link } from "react-router-dom";
import "./leaderboard.css";

export default function Leaderboard() {
  const scores = JSON.parse(localStorage.getItem("score")) || [];

  scores.sort((a, b) => b.score - a.score);

  return (
    <div className="container-leaderboard">
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((scoreData, index) => (
          <li key={index}>
            <span>{scoreData.score}</span>
            <span>{scoreData.user}</span>
            <span>{scoreData.categorie}</span>
            <span>{scoreData.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
