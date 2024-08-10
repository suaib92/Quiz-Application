import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizQuestions } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Quiz component renders the quiz questions and handles user interactions.
 */
const Quiz = () => {
  const [topQuestions, setTopQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const selectedTags = useSelector((state) => state.quiz.selectedTags);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const dispatch = useDispatch();
  const navigate = useNavigate();


// Fetch quiz questions from API
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();

      // Assuming the questions are in the first item of the array
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].questions)) {
        dispatch(setQuizQuestions(data[0].questions));
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  fetchQuestions();
}, [dispatch]);



 
// Filter and sort questions based on selected tags
useEffect(() => {
  if (!Array.isArray(quizQuestions)) return; // Ensure quizQuestions is an array

  const scoredQuestions = quizQuestions.map((question) => {
    const matchCount = question.tags.filter(tag => selectedTags.includes(tag)).length;
    return { ...question, score: matchCount };
  });

  const sortedQuestions = scoredQuestions.sort((a, b) => b.score - a.score);
  setTopQuestions(sortedQuestions.slice(0, 10));
}, [selectedTags, quizQuestions]);


  // Manage timer for the current question
  useEffect(() => {
    if (topQuestions.length === 0) return;

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          handleNextQuestion();
          return 30; // Reset timer for the next question
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex, topQuestions]);

  /**
   * Handles answer selection for the current question.
   * @param {string} option - The selected option.
   */
  const handleAnswer = (option) => {
    const currentAnswers = userAnswers[currentQuestionIndex] || [];

    if (currentAnswers.includes(option)) {
      // Remove option if already selected
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: currentAnswers.filter(ans => ans !== option),
      }));
    } else {
      // Add option if not selected
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: [...currentAnswers, option],
      }));
    }
    setIsAnswerSelected(true);
  };

  /**
   * Moves to the next question or completes the quiz if no more questions.
   */
  const handleNextQuestion = () => {
    if (isAnswerSelected) {
      calculateScore();
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < topQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setTimer(30); // Reset the timer
        setIsAnswerSelected(false); // Reset answer selection status
      } else {
        setIsQuizCompleted(true); // Set quiz as completed
      }
    }
  };

  /**
   * Calculates the score based on user answers and correct answers.
   */
  const calculateScore = () => {
    const currentQuestion = topQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex] || [];
    const correctOptions = new Set(currentQuestion.correct);

    if (currentQuestion.type === 'single') {
      if (userAnswer.length === 1 && userAnswer[0] === currentQuestion.correct[0]) {
        setScore((prevScore) => prevScore + 4);
      } else {
        setScore((prevScore) => prevScore - 2);
      }
    } else if (currentQuestion.type === 'multiple') {
      const selectedOptions = new Set(userAnswer);

      const correctSelected = [...selectedOptions].filter(option => correctOptions.has(option)).length;
      const incorrectSelected = [...selectedOptions].filter(option => !correctOptions.has(option)).length;

      const allCorrectSelected = correctOptions.size === selectedOptions.size && [...correctOptions].every(option => selectedOptions.has(option));

      const scoreForCorrect = correctSelected;
      const scoreForIncorrect = incorrectSelected * -1;

      if (allCorrectSelected) {
        setScore((prevScore) => prevScore + 4);
      }
      setScore((prevScore) => prevScore + scoreForCorrect + scoreForIncorrect);
    }
  };

  /**
   * Navigates back to the home page.
   */
  const handleGoHome = () => {
    navigate('/');
  };

  const currentQuestion = topQuestions[currentQuestionIndex];

  return (
    <div>
      {isQuizCompleted ? (
        <div>
          <h1>Quiz Completed</h1>
          <p>Your Final Score: {score}</p>
          <button onClick={handleGoHome}>Go to Home Page</button>
        </div>
      ) : (
        topQuestions.length > 0 && currentQuestion ? (
          <div>
            <h1>Question {currentQuestionIndex + 1}</h1>
            <p>Type: {currentQuestion.type === 'single' ? 'Single Answer Correct' : 'Multiple Answer Correct'}</p>
            <h2>{currentQuestion.question}</h2>
            <div>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={userAnswers[currentQuestionIndex]?.includes(option) ? 'selected' : ''}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="timer">
              <p>Time Remaining: {timer}s</p>
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswerSelected}
            >
              Next Question
            </button>
          </div>
        ) : (
          <p>Loading questions...</p>
        )
      )}
    </div>
  );
};

export default Quiz;
