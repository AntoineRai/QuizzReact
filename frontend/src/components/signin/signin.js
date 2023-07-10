import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Créer un objet JSON avec les données du formulaire
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // Effectuer la requête POST
    fetch("http://127.0.0.1:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur :", data);
        // Vérifier la réponse du serveur et mettre à jour le message
        if (data.name === name) {
          setResponseMessage("Compte bien créé");
        } else {
          setResponseMessage("Erreur lors de la création du compte");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données :", error);
        setResponseMessage("Erreur lors de la création du compte");
      });

    // Réinitialiser les champs du formulaire
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container-signin">
      <Link to="/">
      <button>Retourner à l'accueil</button>
      </Link>
      <h3>Inscription</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Adresse e-mail :</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
