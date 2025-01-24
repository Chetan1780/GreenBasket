const express = require('express');
const router = express.Router();
const auth = require('../Controllers/AuthController');

// Forget password 
// email verfication 

router.post('/register', auth.register)
router.post('/login',auth.login)

module.exports = router;