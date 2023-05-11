import React, { useState, useEffect } from "react";
import "./questions.css";
import Loading from "../../layout/loading/loading";

function filterByCategorie(questions, categorie) {
  return questions.filter((question) => question.categorie === categorie);
}

export default function Questions({ categorie }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
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

  let filteredQuestions = filterByCategorie(questions, categorie);
  useEffect(() => {
      
      setCurrentQuestion(filteredQuestions[0]);    
      setCurrentQuestion(filteredQuestions[0]);  
      console.log("Filter UseEffect" + filteredQuestions[0]);
  }, [filteredQuestions]);

  console.log("Filter " + filteredQuestions)
  console.log("Current " + currentQuestion)
  console.log("Current with filter" + filteredQuestions[0])

  let lengthOfQuestions = filteredQuestions.length;
  let currentIndexOfQuestions = 0;

  return (
    <div className="container-questions">
      <p>Vous allez répondre à : {lengthOfQuestions} questions</p>

      <p>
        Vous êtes à la question : {currentIndexOfQuestions + 1} /{" "}
        {lengthOfQuestions}
      </p>
      {loading ? (
      <Loading />
      ) : (
      <div className="question">
        <p>{currentQuestion.question}</p>
        <button handleClick={() => {}}>{currentQuestion.response1}</button>
        <button handleClick={() => {}}>{currentQuestion.response2}</button>
        <button handleClick={() => {}}>{currentQuestion.response}</button>
        <button handleClick={() => {}}>{currentQuestion.response4}</button>
      </div>
      )}
    </div>
  );
}
