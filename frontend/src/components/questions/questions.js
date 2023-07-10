import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);
  const [allAnswers, setAllAnswers] = useState([]);

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
    clearTimeout(timerRef.current);
    setShowNextQuestionButton(true);
  }

  function handleNextQuestionClick() {
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextQuestionButton(false);
      setSelectedAnswer(null);
      setTimeLeft(20);
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

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setTimeLeft(20);
      const shuffledAnswers = shuffleArray([
        questions[currentQuestionIndex].reponse2,
        questions[currentQuestionIndex].reponse3,
        questions[currentQuestionIndex].reponse4,
        questions[currentQuestionIndex].reponse5,
        questions[currentQuestionIndex].reponse6,
        questions[currentQuestionIndex].reponse7,
        questions[currentQuestionIndex].reponse8,
        questions[currentQuestionIndex].reponse9,
        questions[currentQuestionIndex].reponse10,
      ])
        .slice(0, 3)
        .concat(questions[currentQuestionIndex].reponse1);

      setAllAnswers(shuffleArray(shuffledAnswers));

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearTimeout(timerRef.current);
            setShowNextQuestionButton(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [currentQuestionIndex, questions]);

  if (loading) {
    return <Loading />;
  }

  //TODO : Si l'utilisateur est connecté, proposer d'enregistrer le score en base de données
  if (showResult) {
    return (
      <div className="container-questions">
        <p>
          Fin du quizz, vous avez eu {score}/{questions.length} bonne(s)
          réponse(s).
        </p>
        <Link to="/">
          <button>Retourner à l'accueil</button>
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container-questions">
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{currentQuestion.question}</p>
      {selectedAnswer === null && timeLeft > 0 && (
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
            <>
              <p>
                Mauvaise réponse. La bonne réponse était{" "}
                {currentQuestion.reponse1}.
              </p>
              <button onClick={handleNextQuestionClick}>
                Question suivante
              </button>
            </>
          )}
          {selectedAnswer === currentQuestion.reponse1 && (
            <button onClick={handleNextQuestionClick}>Question suivante</button>
          )}
        </>
      )}
      {selectedAnswer === null && timeLeft === 0 && (
        <>
          <p>
            Temps écoulé ! La bonne réponse était {currentQuestion.reponse1}.
          </p>
          <button onClick={handleNextQuestionClick}>Question suivante</button>
        </>
      )}
      {selectedAnswer === null && timeLeft > 0 && (
        <div>
          Temps restant : {timeLeft} seconde{timeLeft !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
