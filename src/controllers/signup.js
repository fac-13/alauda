const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');

exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((password) => {
      newUser.create({ username, password });
      res.redirect('/thankYou');
    })
    .catch((err) => {
      if (err.message.includes('duplicate key error index')) {
        res.render('signup', { err: 'This user name is already taken!' });
      } else {
        console.log(err);
      }
    });
};

// newUser.create({ username, password })
