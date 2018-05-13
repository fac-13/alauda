require('env2')('.env');
const fetch = require('node-fetch');

const query = 'first';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;
const giphyUrl = 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC';
exports.get = async (req, res) => {
  const responses = await Promise.all([
    fetch(newsUrl).then(data => data.json()).then(data => data.articles),
    fetch(giphyUrl).then(data => data.json()).then(json => json.data),
  ]);
  res.send(responses);
};
