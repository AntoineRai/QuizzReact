import React, { useState, useEffect } from "react";
import "./questions.css";
import Loading from "../../layout/loading/loading";

export default function Questions({ categorie }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function filterByCategorie(questions, categorie) {
    return questions.filter((question) => question.categorie === categorie);
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].reponse1) {
      setScore(score + 1);
    }
    setShowNextQuestionButton(true);
  }

  function handleNextQuestionClick() {
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextQuestionButton(false);
      setSelectedAnswer(null);
    }
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setQuestions(filterByCategorie(data, categorie).slice(0, 4));
      })
      .catch((error) =>
        console.error("Erreur lors du fetch des questions:", error)
      );
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (showResult) {
    return (
      <div className="container-questions">
        <p>
          Fin du quizz, vous avez eu {score}/{questions.length} bonne(s)
          réponse(s).
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const otherAnswers = shuffleArray([
    currentQuestion.reponse2,
    currentQuestion.reponse3,
    currentQuestion.reponse4,
    currentQuestion.reponse5,
    currentQuestion.reponse6,
    currentQuestion.reponse7,
    currentQuestion.reponse8,
    currentQuestion.reponse9,
    currentQuestion.reponse10,
  ]).slice(0, 3);
  const randomPosition = Math.floor(Math.random() * 4);
  const allAnswers = [
    ...otherAnswers.slice(0, randomPosition),
    currentQuestion.reponse1,
    ...otherAnswers.slice(randomPosition)
  ];

  return (
    <div className="container-questions">
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{currentQuestion.question}</p>
      {selectedAnswer === null && (
        <div className="button-container">
          {allAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className="answer-button"
            >
              {answer}
            </button>
          ))}
        </div>
      )}
      {selectedAnswer !== null && (
        <>
          {selectedAnswer === currentQuestion.reponse1 ? (
            <p>Bonne réponse !</p>
          ) : (
            <p>
              Mauvaise réponse. La bonne réponse était {currentQuestion.reponse1}.
            </p>
          )}
          <button onClick={handleNextQuestionClick}>
            Question suivante
          </button>
        </>
      )}
    </div>
  );
}
