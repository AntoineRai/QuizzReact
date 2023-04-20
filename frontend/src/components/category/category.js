import React, { useState, useEffect } from "react";
import "./category.css";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch des données depuis l'API
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors du fetch des catégories:", error)
      );
  }, []);

  return (
    <div className="container-category">
      <h1>Choisir une catégorie :</h1>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.id}>
            <button className="category-button">{category.categorie}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
