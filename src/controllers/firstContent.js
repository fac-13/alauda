require('env2')('.env');
const fetch = require('node-fetch');

const query = 'first';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

exports.get = (req, res) => {
  fetch(newsUrl)
    .then(response => response.json())
    .then(json => json.articles)
    .then(data => res.send(data));
};
