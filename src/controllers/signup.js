const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');

exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  console.log("Res body:", req.body); 
  const { username, password, age, like } = req.body;
  bcrypt
    .hash(password, 10)
    .then(password => newUser.create({ username, password }))
    .then(() => res.render('thankYou', { user: username }))
    .catch((err) => {
      if (err.message.includes('duplicate')) {
        res.render('signup', { err: 'This username is already taken!' });
      } else {
        console.log(err);
        // render error page
      }
    });
};

// newUser.create({ username, password })
