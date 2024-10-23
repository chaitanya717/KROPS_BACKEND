const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit the process if the database connection fails
});

// Middleware
app.use(express.json()); // Built-in body parser in Express

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
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
