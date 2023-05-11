import React, { useState, useEffect } from "react";
import "./questions.css";
import Loading from "../../layout/loading/loading";

function filterByCategorie(questions, categorie) {
  return questions.filter((question) => question.categorie === categorie);
}

function isTheGoodAnswer(filteredQuestions,currentIndexOfQuestions,selectedAnswer){
  return filteredQuestions[currentIndexOfQuestions].reponse1 === selectedAnswer
}

export default function Questions({ categorie }) {
  // States
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentIndexOfQuestions, setCurrentIndexOfQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);


  // Fetch des données depuis l'API
  useEffect(() => {
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

  // Filtrage des questions par catégorie
  let filteredQuestions = filterByCategorie(questions, categorie);

  // Set la question courante
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      setCurrentQuestion(filteredQuestions[currentIndexOfQuestions]);
    }
  }, [filteredQuestions, currentIndexOfQuestions]);

  let lengthOfQuestions = filteredQuestions.length;

  // Gestion des clicks sur les réponses
  const handleClick = (event) => {
    let isCorrect = isTheGoodAnswer(filteredQuestions, currentIndexOfQuestions ,event.target.name);
    if (isCorrect) {
      alert("Bonne réponse !")
      setScore(score + 1);
      if (currentIndexOfQuestions === lengthOfQuestions - 1) {
        alert("Vous avez fini le quizz avec un score de " + score + " / " + lengthOfQuestions + " !")
      } else {
        setCurrentIndexOfQuestions(currentIndexOfQuestions + 1)
        setCurrentQuestion(filteredQuestions[currentIndexOfQuestions]);
      }
    } else {
      alert("Mauvaise réponse !")
      if (currentIndexOfQuestions === lengthOfQuestions - 1) {
        alert("Vous avez fini le quizz avec un score de " + score + " / " + lengthOfQuestions + " !")
      } else {
        setCurrentIndexOfQuestions(currentIndexOfQuestions + 1)
        setCurrentQuestion(filteredQuestions[currentIndexOfQuestions]);
      }
    }
  };

  return (
    <div className="container-questions">
      {loading ? (
        <Loading />
      ) : filteredQuestions.length > 0 ? (
        <>
          <p>Vous allez répondre à : {lengthOfQuestions} questions</p>

          <p>
            Vous êtes à la question : {currentIndexOfQuestions + 1} /{" "}
            {lengthOfQuestions}
          </p>

          <div className="question">
            <h1><u>Question {currentIndexOfQuestions + 1} :</u> {currentQuestion.question}</h1>
          </div>
          <div className="reponses">
            <button className="answer1" onClick={handleClick} name={currentQuestion.reponse1}>{currentQuestion.reponse1}</button>
            <button className="answer2" onClick={handleClick} name={currentQuestion.reponse2}>{currentQuestion.reponse2}</button>
            <button className="answer3" onClick={handleClick} name={currentQuestion.reponse3}>{currentQuestion.reponse3}</button>
            <button className="answer4" onClick={handleClick} name={currentQuestion.reponse4}>{currentQuestion.reponse4}</button>
          </div>
        </>
      ) : (
        <p>Aucune question trouvée pour cette catégorie.</p>
      )}
    </div>
  );
}
