const express = require('express');
const router = express.Router();

const home = require('./home');
const randomGift = require('./randomGift');
const randomContent = require('./randomContent');
const firstContent = require('./firstContent');
const getsubscribedcontent = require('./getsubscribedcontent');
// const regularContent = require('./regularContent');
const thankYou = require('./thankYou');
const signup = require('./signup');
const login = require('./login');
const userContent = require('./userContent');
const profile = require('./profile');
const deleteProfile = require('./deleteProfile');
const logout = require('./logout');

const cookieSession = require('cookie-session');

router.use(cookieSession({ name: 'our_session', secret: process.env.SECRET }));
router.get('/', home.get);
router.get('/try', randomGift.get);
router.get('/randomContent', randomContent.get);
router.get('/api/firstContent', firstContent.get);
router.get('/usercontent', userContent.get);
router.get('/api/regularcontent', getsubscribedcontent.get);
// router.get('api/content', regularContent.get);
router.get('/signup', signup.get);
router.post('/signup', signup.post);
router.get('/login', login.get);
router.post('/login', login.post);
router.get('/thankYou', thankYou.get);
router.get('/profile/:username', profile.get);
router.get('/logout', logout.get);
router.get('/delete', deleteProfile.get);

module.exports = router;
