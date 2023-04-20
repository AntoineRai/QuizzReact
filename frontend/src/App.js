import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/category' element={<CategoryPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
