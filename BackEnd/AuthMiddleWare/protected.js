const express = require('express');
const router = express.Router();
const verifyToken = require("./index");

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', userId: req.userId });
});

module.exports = router;
