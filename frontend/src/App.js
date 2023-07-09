import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import CategoryPage from "./pages/CategoryPage";
import QuestionPage from "./pages/QuestionPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/questions/:categorie" element={<QuestionPage />} />
        <Route path="/result/:score" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
