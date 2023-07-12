import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import "./profil.css";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(""); // [1
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;

    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Requête réussie");
        setSuccess("Votre profil a bien été modifié");

        // Supprimer le localStorage "user" et le remplacer par les nouvelles informations du formulaire
        const updatedUser = {
          id: user.id,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        console.log(updatedUser);
        console.log(JSON.stringify(updatedUser));
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        setError("Une erreur s'est produite");
        console.error("Une erreur s'est produite", error);
      });
  };

  return (
    <div className="container-profil">
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
      <h1>Editer votre profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
