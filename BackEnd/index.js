const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes and middlewares
const authRoutes = require('./Authentication/index');
const protectedRoute = require('./AuthMiddleWare/protected');
const connectToDataBase = require('./dataBase/db');
const productRoutes = require('./routes/productRoutes');
const verifyToken= require('./AuthMiddleWare/protected')

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoute);
app.use('/products',productRoutes)
app.use('/verifyToken',verifyToken)

// Database connection
const startServer = async () => {
  try {
    // Connect to database
    await connectToDataBase();
    console.log('Successfully connected to database');

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);;
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();

module.exports = app;