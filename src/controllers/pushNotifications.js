const { getUsersByTime } = require('./../model/queries/getUsersByTime');
const { CronJob } = require('cron');

let data ='07:00';

const job = new CronJob({
    cronTime: '00 55 17 * * 1-7',
    onTick() {
        console.log('croning');
        getSameTimer('00 00 07 * * 1-7')
    },
    start: false,
    timeZone: 'Europe/London',
  });
  
  job.start();

// let data = '00 00 07 * * 1-7'
const getSameTimer = async (timee) => {
    try {
      const sameTimers = await getUsersByTime(timee);
      console.log(sameTimers);
    } catch (err) {
      console.log(err);
    }
  };

module.exports = { getSameTimer };