const express = require('express');
const { category, search, filter } = require('../Controllers/ProductController');
const router = express.Router();

// Get 
router.get('/category/:category' , category );
// Search
router.get('/search',search );

// Filter 
router.get('/filter',filter);

module.exports = router;
