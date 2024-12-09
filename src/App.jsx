import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import heartAnimation from './assets/heartAnimation.json'; // Heart Animation JSON
import fireworksAnimation from './assets/fireworks.json'; // Fireworks Animation JSON

// Import all memory images
import memory1 from './assets/memory1.jpg';
import memory2 from './assets/memory2.jpg';
import memory3 from './assets/memory3.jpg';
import memory4 from './assets/memory4.jpg';
import memory5 from './assets/memory5.jpg';
import memory6 from './assets/memory6.jpg';
import memory7 from './assets/memory7.jpg';
import memory8 from './assets/memory8.jpg';
import memory9 from './assets/memory9.jpg';
import memory10 from './assets/memory10.jpg';

import puzzleImage from './assets/memory10.jpg'; // Puzzle Image
import { motion } from "framer-motion"; // For smooth animations
import './App.css';

const memoryImages = [memory1, memory2, memory3, memory4, memory5, memory6, memory7, memory8, memory9, memory10];

const questions = [
  "What is the date when we first met?",
  "Where did we first meet?",
  "What was your first impression of me?",
  "What is one thing you love about me?",
  "What was the happiest moment we shared?",
  "Where did we go as our first date?",
  "What is something you've always wanted to tell me?",
  "What is your favorite thing about our relationship?",
  "How do you see us in the future?",
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/level/:level" element={<LevelPage />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </Router>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();

  const startJourney = () => {
    navigate("/level/1");
  };

  return (
    <div className="welcome-page">
      <Lottie options={{ animationData: heartAnimation, loop: true }} height={400} width={400} />
      <h1>Welcome to Our Journey!</h1>
      <p>Click below to begin our love story!</p>
      <button onClick={startJourney} className="start-btn">Start Journey</button>
    </div>
  );
};

const LevelPage = () => {
  const navigate = useNavigate();
  const { level } = useParams();
  const [input, setInput] = useState("");

  const handleAnswer = () => {
    if (!input.trim()) {
      alert("abey anpadd ullu gadhi ans toh de ya pata nhi aur thoda slow jaa image load hone de .");
      return;
    }

    if (parseInt(level) < 9) {
      navigate(`/level/${parseInt(level) + 1}`);
    } else {
      navigate("/end");
    }
  };

  return (
    <div className="level-page">
      <motion.div
        className="heart-container"
        initial={{ x: -300 }}
        animate={{ x: parseInt(level) * 150 }} // Heart moves based on the level
        transition={{ duration: 1 }}
      >
        <Lottie options={{ animationData: heartAnimation, loop: true }} height={100} width={100} />
      </motion.div>

      <div className="road">
        <div className="stop" style={{ left: `${parseInt(level) * 150}px` }}>
          <img src={memoryImages[parseInt(level) - 1]} alt={`Memory ${level}`} className="stop-image" />
        </div>
      </div>

      <h2>Level {level}</h2>
      <p>{questions[parseInt(level) - 1]}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
        className="answer-input"
      />
      <button onClick={handleAnswer} className="submit-btn">Submit</button>
    </div>
  );
};

const EndPage = () => {
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  const handlePuzzleCompletion = () => {
    alert("itna kuch khaas ans nhi diya ");
    setPuzzleCompleted(true);
  };

  return (
    <div className="end-page">
      <h2>Final Question: Will you be with me forever?</h2>
      {!puzzleCompleted ? (
        <div className="puzzle">
          <h3>Arrange the pieces of our love!</h3>
          <div className="puzzle-container">
            <img src={puzzleImage} alt="Puzzle" className="puzzle-image" />
            <button onClick={handlePuzzleCompletion} className="done-btn">Done</button>
          </div>
        </div>
      ) : (
        <div className="final-message">
          <Lottie options={{ animationData: fireworksAnimation, loop: true }} height={400} width={400} />
          <h1>I Love You Very Much, Will you be with me forever?</h1>
          <button onClick={() => alert("You have no options; you're stuck with me forever!")} className="celebrate-btn">Yes!</button>
        </div>
      )}
    </div>
  );
};

export default App;
