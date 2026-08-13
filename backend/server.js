const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/pool');

// Load values from .env file
dotenv.config();

// Create Express app
const app = express();

// Add middleware
// CORS allows frontend and backend to communicate
app.use(cors());

// Allows Express to read JSON data from requests
app.use(express.json());

// Add task API routes
// All task routes will start with /api/tasks
app.use('/api/tasks', require('./routes/taskRoutes'));

// Get port from .env
// Use 5000 if PORT is not given
const PORT = process.env.PORT || 5000;


// Check MySQL connection before starting the server
db.getConnection()
  .then((connection) => {

    // Database connection is successful
    console.log('MySQL Database connected successfully.');

    // Release the connection after checking it
    connection.release();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {

    // Show error if database connection fails
    console.error(
      'Unable to connect to MySQL database:',
      error.message
    );

    // Stop the server because database is not connected
    process.exit(1);
  });