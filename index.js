const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS, // Use ALLOWED_ORIGINS from .env or default to allowing all origins
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Signup API!');
});
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
