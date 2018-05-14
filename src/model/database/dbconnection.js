const mongoose = require('mongoose');

require('env2')('./.env');

if (!process.env.DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL should be set');
}

mongoose.connect(process.env.DATABASE_URL);

