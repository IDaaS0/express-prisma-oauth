const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/auth', auth);

module.exports = router;