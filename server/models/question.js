const mongoose = require('mongoose');

/**
 * Schema for the Question model.
 */
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
