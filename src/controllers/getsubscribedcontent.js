require('env2')('.env');
const fetch = require('node-fetch');
const { CronJob } = require('cron');
const fs = require('fs');

const science = 'new-scientist';
const scienceUrl = `https://newsapi.org/v2/top-headlines?sources=${science}&apiKey=${process.env.NEWS_KEY}`;

const nature = 'national-geographic';
const natureUrl = `https://newsapi.org/v2/top-headlines?sources=${nature}&apiKey=${process.env.NEWS_KEY}`;

const tech = 'wired, techcrunch, techradar';
const techUrl = `https://newsapi.org/v2/top-headlines?sources=${tech}&apiKey=${process.env.NEWS_KEY}`;

const movies = 'entertainment-weekly';
const moviesUrl = `https://newsapi.org/v2/everything?sources=${movies}&q=movie&apiKey=${process.env.NEWS_KEY}`; 

const art = 'the-huffington-post'; 
const artUrl = `https://newsapi.org/v2/everything?sources=${art}&q=art&apiKey=${process.env.NEWS_KEY}`; 

const book = 'the-new-york-times'; 
const bookUrl = `https://newsapi.org/v2/everything?sources=${book}&q=books&apiKey=${process.env.NEWS_KEY}`; 

const content = {
    "science": ['dna', 'singularity', 'tihkal'],
    "nature": ['birds', 'foxes', 'fish'],
    "tech": ['js', 'python', 'sql'],
    "movies": ['tarantino', 'park chan wook', 'tarkovsky'],
    "art": ['picasso', 'ivi', 'isaac'],
    "books": ['js good bits', 'elquent js', 'war and peace']
}

/**
 * @param  {} url; make an API call and update content object
 */
const fetchApi = async () => {
    const responses = await Promise.all([
        fetch(scienceUrl).then(data => data.json()).then(data => data.articles),
        fetch(natureUrl).then(data => data.json()).then(data => data.articles),
        fetch(techUrl).then(data => data.json()).then(data => data.articles),
        fetch(moviesUrl).then(data => data.json()).then(data => data.articles),
        fetch(artUrl).then(data => data.json()).then(data => data.articles),
        fetch(bookUrl).then(data => data.json()).then(data => data.articles)
    ])
    content.science = responses[0];
    content.nature = responses[1];
    content.tech = responses[2];
    content.movies = responses[3];
    content.art = responses[4]; 
    content.books = responses[5]; 
    writeDataToFile(content);
};

fetchApi(); 

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
    cronTime: '00 21 18 * * 1-7',
    onTick() {
        fetchApi();
        console.log('Cron Job is being done')
    },
    start: false,
    timeZone: 'Europe/London',
});

job.start();
