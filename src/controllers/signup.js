// const bcrypt = require('bcryptjs');
const userSignUp = require('./../model/queries/userSignUp');

exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  const { email, password } = req.body;
  userSignUp.create({ email, password })
    .then(console.log('Success!'))
    .catch((error) => {
      console.log(error);
    });
  // bcrypt
  //   .hash(password, 10)
  //   .then(hash => userSignUp.create({ email, hash }))
};
