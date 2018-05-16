require('env2')('.env');
const fetch = require('node-fetch');
const { CronJob } = require('cron');
const fs = require('fs');

const query = 'inspiration';
const newsUrl = `https://newsapi.org/v2/everything?q=${query}&totalResults=10&apiKey=${process.env.NEWS_KEY}`;

var content = {
    'hello': 'Julia'
};
/**
 * @param  {} url; make an API call
 */
const fetchApi = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((json) => {
        
        getjsoninjson(json);
        content = json;
      console.log('Consolelogging from getsubscribeduser', json);
    });
};

// fs.writeFileSync('content.json', JSON.stringify(content), (err) => {
//     if(err) console.log(err);
// });

function getjsoninjson(data) {
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
// fetchApi(newsUrl);
exports.get = (req, res) => {
  res.send(content);
};