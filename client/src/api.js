// frontend/src/api.js
const API_URL = 'http://localhost:5000/api';

export const fetchQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`);
  return response.json();
};

export const fetchTags = async () => {
  const response = await fetch(`${API_URL}/tags`);
  return response.json();
};

export const submitAnswers = async (answers) => {
  const response = await fetch(`${API_URL}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  return response.json();
};
