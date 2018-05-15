const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');


exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  const { username, password, time, like } = req.body;
  bcrypt
    .hash(password, 10)
    .then(password => newUser.create({ username, password, time, like }))
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


