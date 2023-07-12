import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./category.css";
import Loading from "../../layout/loading/loading";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch des données depuis l'API
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCategories(data);
      })
      .catch((error) =>
        console.error("Erreur lors du fetch des catégories:", error)
      );
  }, []);

  return (
    <div className="container-category">
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
      <h1>Choisir une catégorie :</h1>
      <ul className="categories-list">
        {loading ? (
          <Loading />
        ) : (
          categories.map((category) => (
            <li key={category.id}>
              <Link to={`/questions/${category.categorie}`}>
                {" "}
                <button className="category-button">
                  {category.categorie}
                </button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
