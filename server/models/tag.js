const mongoose = require('mongoose');

/**
 * Schema for the Tag model.
 */
const tagSchema = new mongoose.Schema({
  uniqueTags: {
    type: [String],
    required: true,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
