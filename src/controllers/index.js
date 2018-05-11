const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('env2')('.env');

const router = express.Router();

const content = {
  music: {},
  images: {},
  news: [],
};
// const category = 'entertainment,health,science,technology';
const newsUrl = `https://newsapi.org/v2/everything?q=inspirational&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

router.get('/', (req, res) => {
  console.log('home route reached');
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

router.get('/api/content', (req, res) => {
  fetch(newsUrl)
    .then(response => response.json())
    .then((json) => {
      content.news = json.articles;
      res.send(content);
    });
});

module.exports = router;
