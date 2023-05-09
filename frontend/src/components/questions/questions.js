import React, { useState, useEffect } from "react";
import "./category.css";
import Loading from "../../layout/loading/loading";

function filterByCategorie(questions, categorie) {
  return questions.filter((question) => question.categorie === categorie);
}

export default function Questions(categorie) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch des données depuis l'API
    fetch("http://127.0.0.1:8000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setQuestions(data);
      })
      .catch((error) =>
        console.error("Erreur lors du fetch des questions:", error)
      );
    filterByCategorie(questions, categorie);
  }, []);

  return (
    <div className="container-questions">
        {loading ? (
            <Loading />
        ) : (
            //TODO: Afficher les questions de la catégorie sélectionnée
            <h1>Les questions</h1>
        )}
    </div>
  );
}
