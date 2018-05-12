require('env2')('.env');
const fetch = require('node-fetch');
const { CronJob } = require('cron');

const query = 'inspiration';
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
/*
     * Runs every day at 00:00:00 AM and fetches content from News Api
*/
const job = new CronJob({
  cronTime: '00 00 00 * * 1-7',
  onTick() {
    fetchApi(newsUrl);
  },
  start: false,
  timeZone: 'Europe/London',
});

job.start();

exports.get = (req, res) => {
  res.send(content);
};
