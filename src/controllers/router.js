const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const router = express.Router();

const home = require('./home');
const randomGift = require('./randomGift');
const randomContent = require('./randomContent');
const register = require('./register');

const content = {
  music: {},
  images: {},
  placeholder: [],
};

const placeholderUrl =
  'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC';


router.get('/', home.get);
router.get('/try', randomGift.get);
router.get('/randomContent', randomContent.get);
router.get('/register', register.get);

router.get('/api/content', (req, res) => {
  fetch(placeholderUrl)
    .then(response => response.json())
    .then((json) => {
      const data = json.data;
      content.placeholder = data.map(el => el.images.original.url);
      res.send(content);
    });
});

module.exports = router;
