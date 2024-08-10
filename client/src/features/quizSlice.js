import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    tags: [],
    selectedTags: [],
    quizQuestions: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    selectTag: (state, action) => {
      if (!state.selectedTags.includes(action.payload)) {
        state.selectedTags.push(action.payload);
      }
    },
    deselectTag: (state, action) => {
      state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload);
    },
    setQuizQuestions: (state, action) => {
      state.quizQuestions = action.payload;
    },
  },
});

export const { setTags, selectTag, deselectTag, setQuizQuestions } = quizSlice.actions;
export default quizSlice.reducer;
