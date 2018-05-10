const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const router = express.Router();

const content = {
  music: {},
  images: {},
  placeholder: []
};

const placeholderUrl =
  'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC';

router.get('/', (req, res) => {
  console.log('home route reached');
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

router.get('/api/content', (req, res) => {
  fetch(placeholderUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const data = json.data;
      content.placeholder = data.map(el => el.images.original.url);
      res.send(content);
    });
});

module.exports = router;
