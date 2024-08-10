const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the provided URI.
 * @param {string} uri - MongoDB URI.
 * @returns {Promise} - Resolves when connection is successful.
 */
const connectDB = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDB;
