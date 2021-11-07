const express = require('express');
const router = express.Router();
const auth = require('./auth');
const createError = require('http-errors');
router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/auth', auth);

module.exports = router;