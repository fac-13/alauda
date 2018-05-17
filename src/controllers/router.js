const express = require('express');

const router = express.Router();

const home = require('./home');
const randomGift = require('./randomGift');
const randomContent = require('./randomContent');
const tryContent = require('./tryContent');
const getsubscribedcontent = require('./getsubscribedcontent');
const thankYou = require('./thankYou');
const signup = require('./signup');
const login = require('./login');
const userContent = require('./userContent');
const profile = require('./profile');
const deleteProfile = require('./deleteProfile');
const logout = require('./logout');
const error = require('./error');

const cookieSession = require('cookie-session');
// router.use(express.static(path.join(__dirname, '..', '..', 'public')));

router.use(cookieSession({ name: 'our_session', secret: process.env.SECRET }));
router.get('/', home.get);
router.get('/randomGift', randomGift.get);
router.get('/randomContent', randomContent.get);
router.get('/api/tryContent', tryContent.get);
router.get('/usercontent/:username', userContent.get);
// router.get('api/content', regularContent.get);
router.get('/signup', signup.get);
router.post('/signup', signup.post);
router.get('/login', login.get);
router.post('/login', login.post);
router.get('/thankYou/:username', thankYou.get);
router.get('/profile/:username', profile.get);
router.get('/logout', logout.get);
router.get('/delete', deleteProfile.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
