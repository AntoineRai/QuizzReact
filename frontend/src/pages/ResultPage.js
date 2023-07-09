import React from "react";
import Result from "../components/result/result";
import { useParams } from "react-router-dom";

export default function QuestionPage() {
  const { score } = useParams();

  return (
  <>
  <Result categorie={score} />
  </>);
}
