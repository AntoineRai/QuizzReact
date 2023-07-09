import './result.css'

export default function Result({ score }) {
  return (
    <div className="result">
      <h1>Félications, vous avez obtenu un score de : {score}</h1>
    </div>
  );
}