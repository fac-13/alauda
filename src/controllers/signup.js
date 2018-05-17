const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');

exports.get = (req, res) => {
  res.render('signup', { backLink: '/' });
};

exports.post = (req, res) => {
  const {
    username, password, like,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then(password => newUser.create({
      username, password, like,
    }))
    .then(() => {
      req.session.username = username;
      req.session.loggedIn = true;
      res.redirect(`/thankYou/${username}`);
    })
    .catch((err) => {
      if (err.message.includes('duplicate')) {
        res.render('signup', { err: 'This username is already taken!' });
      } else {
        console.log(err);
        // render error page
      }
    });
};

