import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTags, selectTag, deselectTag } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

/**
 * TagSelector component allows users to select tags and start the quiz.
 */
const TagSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.quiz.tags);
  const selectedTags = useSelector((state) => state.quiz.selectedTags);

  /**
   * Fetches tags from the API and updates Redux store.
   */
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tags');
        const data = await response.json();
        dispatch(setTags(data));
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, [dispatch]);

  /**
   * Handles tag click events.
   * @param {string} tag - The tag that was clicked.
   */
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      dispatch(deselectTag(tag));
    } else {
      dispatch(selectTag(tag));
    }
  };

  /**
   * Navigates to the quiz page.
   */
  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div>
      <h1 className='hqq'>Select Tags</h1>
      <div className="tags-container">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={selectedTags.includes(tag) ? 'selected' : ''}
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        onClick={handleStartQuiz}
        disabled={selectedTags.length === 0}
        className="start-quiz-button"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default TagSelector;
