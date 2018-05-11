const express = require('express');

const router = express.Router();

const home = require('./home');
const randomGift = require('./randomGift');
const randomContent = require('./randomContent');
const { content, fetchApi } = require('./logic');
require('env2')('.env');

const query = 'inspiration';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

router.get('/', home.get);
router.get('/try', randomGift.get);
router.get('/randomContent', randomContent.get);
router.get('/api/firstContent', (req, res) => {
  fetchApi(newsUrl);
  res.send(content);
});
router.get('/api/content', (req, res) => {
  res.send(content);
});

module.exports = router;
