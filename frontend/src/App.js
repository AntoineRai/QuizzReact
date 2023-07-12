import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import CategoryPage from "./pages/CategoryPage";
import QuestionPage from "./pages/QuestionPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilPage from "./pages/ProfilPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/questions/:categorie" element={<QuestionPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
