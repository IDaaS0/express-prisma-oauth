const router = require('express').Router();
const user = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// router.get('/oauth', user.oauth);
router.get('/oauth/callback', user.oauthCallback);
router.get('/me', auth, user.me);
router.get('/all', auth, user.all);

module.exports = router;