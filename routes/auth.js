const router = require('express').Router();
const user = require('../controllers/auth.controller');

router.get('/oauth', user.oauth);
router.get('/oauth/callback', user.oauthCallback);

module.exports = router;