const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://suaib:yr2lNLKQtMDWeszg@cluster0.7e3g0.mongodb.net/quizdb?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
