const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const Question = require('../models/question');

/**
 * Endpoint to get all tags.
 * @route GET /api/tags
 * @returns {Object} - List of unique tags.
 */
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findOne();
    if (tags) {
      res.json(tags.uniqueTags);
    } else {
      res.status(404).json({ message: 'No tags found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Endpoint to get questions based on tags.
 * @route GET /api/questions
 * @param {string} tags - Comma-separated list of tags.
 * @returns {Array} - List of questions matching the tags.
 */
router.get('/questions', async (req, res) => {
  try {
    const { tags } = req.query;

    const query = tags ? { tags: { $in: tags.split(',') } } : {};

    const questions = await Question.find(query);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
