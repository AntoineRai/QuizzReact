import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const isLoggedIn = localStorage.getItem("user");

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  return (
    <div className="container-home">
      <img
        src="logo.png"
        alt="logo-presque-comme-react"
        className="rotateImg"
      />
      <h1>Quizz Culture</h1>
      {isLoggedIn ? (
        <>
          <p>Bonjour {JSON.parse(isLoggedIn).name}</p>
          <Link to="/category">
            <button className="btn">Jouer</button>
          </Link>
          <button className="btn" onClick={handleLogOut}>
            Se déconnecter
          </button>
          <Link to="/profile">
            <button className="btn">Editer son profil</button>
          </Link>
          <Link to="/leaderboard">
            <button className="btn">Tableau des scores</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/category">
            <button className="btn">Jouer</button>
          </Link>
          <Link to="/signin">
            <button className="btn">S'inscrire</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Se connecter</button>
          </Link>
          <Link to="/leaderboard">
            <button className="btn">Tableau des scores</button>
          </Link>
        </>
      )}
    </div>
  );
}
