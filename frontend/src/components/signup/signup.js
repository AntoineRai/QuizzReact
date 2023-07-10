import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

export default function LoginForm({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //TODO : Si l'utilisateur est déjà connecté, afficher un message l'invitant à se déconnecter

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          setLoggedInUser(user);
          setErrorMessage("");
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setLoggedInUser(null);
          setErrorMessage("Identifiants de connexion incorrects");
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      });
  };

  return (
    <div className="signup-container">
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
      <h3>Connexion</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {loggedInUser && <p>Connecté en tant que {loggedInUser.email}</p>}
    </div>
  );
}
