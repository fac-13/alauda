const express = require('express');
const path = require('path');
const controllers = require('./controllers/router');
const exphbs = require('express-handlebars');
require('env2')('./.env');

const app = express();

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
app.set('port', process.env.PORT || 3000);

app.use(controllers);
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
