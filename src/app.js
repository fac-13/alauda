const express = require('express');
const path = require('path');
const controllers = require('./controllers/router');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbconnection = require('./model/database/dbconnection');

require('env2')('./.env');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  }),
);


app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(controllers);

module.exports = app;
