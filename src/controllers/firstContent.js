require('env2')('.env');
const fetch = require('node-fetch');

const query = 'first';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

const content = {
  news: [],
};
/**
 * @param  {} url; make an API call
 */
const fetchApi = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      content.news = json.articles;
    });
};

exports.get = async (req, res) => {
  await fetchApi(newsUrl);
  res.send(content);
};
