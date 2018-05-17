require('env2')('.env');
const fetch = require('node-fetch');
const { CronJob } = require('cron');
const fs = require('fs');

const query = 'inspiration';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

var content = {
    "Tech": [],
    "Nature": [],
    "Science": [],
    "Travel": [],
    "Psychology": [],
    "Movies": [],
    "Art": [],
    "Books": []
;
/**
 * @param  {} url; make an API call and update content object
 */
const fetchApi = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((json) => {
        content = json;
    });
};

writeDataToFile(content);

/**
  * @param  {} data; Writes data that came from API calls into a json file that is stored for a day in the root folder.
*/
function writeDataToFile(data) {
    try {
        fs.writeFileSync('content.json', JSON.stringify(data));
    } catch (err) {
        console.log('this is the error', err);
    }
}
/*
     * Runs every day at 00:00:00 AM and fetches content from News Api
*/
const job = new CronJob({
  cronTime: '00 34 15 * * 1-7',
  onTick() {
    fetchApi(newsUrl);
    console.log('Cron Job is being done')
  },
  start: false,
  timeZone: 'Europe/London',
});

job.start();

exports.get = (req, res) => {
  res.send(content);
};