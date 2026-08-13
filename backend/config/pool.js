const mysql = require("mysql2/promise");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


// Create a MySQL connection pool
const pool = mysql.createPool({
    // Get database host from .env
    host: process.env.DB_HOST,

    // Get database username from .env
    user: process.env.DB_USER,

    // Get database password from .env
    password: process.env.DB_PASSWORD,

    // Get database name from .env
    database: process.env.DB_NAME,

    // Use 3306 if DB_PORT is not given
    port: process.env.DB_PORT || 3306,

    // Wait for a connection if all connections are busy
    waitForConnections: true,

    // Maximum 10 database connections can be used at once
    connectionLimit: 10,

    // No limit on waiting requests
    queueLimit: 0,
});


// Export the pool so other files can use the database
module.exports = pool;