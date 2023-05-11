import React from "react";
import Question from "../components/questions/questions";
import { useParams } from "react-router-dom";

export default function QuestionPage() {
  const { categorie } = useParams();

  return (
  <>
  <Question categorie={categorie} />
  </>);
}
