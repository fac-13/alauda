const express = require('express');
const path = require('path');
const controllers = require('./controllers/index');

require('env2')('./.env');

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

app.use(controllers);
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
