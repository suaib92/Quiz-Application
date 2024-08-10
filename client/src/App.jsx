import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagSelector from './components/TagSelector';
import Quiz from './components/Quiz';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TagSelector />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
