import React, { useState, useEffect } from "react";
import "./questions.css";
import Loading from "../../layout/loading/loading";

function filterByCategorie(questions, categorie) {
  return questions.filter((question) => question.categorie === categorie);
}

export default function Questions({ categorie }) {
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
  }, []);

  const filteredQuestions = filterByCategorie(questions, categorie);

  return (
    <div className="container-questions">
      <h1>Les questions de la catégorie "{categorie}"</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="questions-list">
          {filteredQuestions.map((question) => (
            <div className="question" key={question.id}>
              <p>{question.question}</p>
              <ul className="answers-list">
                <li>{question.reponse1}</li>
                <li>{question.reponse2}</li>
                <li>{question.reponse3}</li>
                <li>{question.reponse4}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
