const router = require('express').Router();
const user = require('../controllers/auth.controller');

router.get('/oauth', user.oauth);
router.get('/oauth/callback', user.oauthCallback);
router.get('/all', user.all);

module.exports = router;