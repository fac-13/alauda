// const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');

exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  const { username, password } = req.body;
  newUser.create({ username, password })
    .then(console.log('Success!'))
    .catch((error) => {
      console.log(error);
    });
  // bcrypt
  //   .hash(password, 10)
  //   .then(hash => newUser.create({ email, hash }))
};
