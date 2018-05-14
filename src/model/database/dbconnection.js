const mongoose = require('mongoose');

require('env2')('./.env');

let dbconnect = process.env.DATABASE_URL;

if (!dbconnect) {
  throw new Error('Environment variable DATABASE_URL should be set');
}
if (process.env.NODE_ENV === 'test') {
  dbconnect = process.env.TEST_URL;
}

mongoose.connect(dbconnect);
