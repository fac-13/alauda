const express = require('express');

const router = express.Router();

const home = require('./home');
const randomGift = require('./randomGift');
const randomContent = require('./randomContent');
const firstContent = require('./firstContent');
const regularContent = require('./regularContent');
const thankYou = require('./thankYou');
const signup = require('./signup');
const login = require('./login');

router.get('/', home.get);
router.get('/try', randomGift.get);
router.get('/randomContent', randomContent.get);
router.get('/api/firstContent', firstContent.get);
router.get('api/content', regularContent.get);
router.get('/signup', signup.get);
router.post('/signup', signup.post);
router.get('/login', login.get);
router.post('/login', login.post);
router.get('/thankYou', thankYou.get);

module.exports = router;
