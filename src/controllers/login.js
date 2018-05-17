const bcrypt = require('bcryptjs');
const { getUser } = require('./../model/queries/getUser');

exports.get = (req, res) => {
  res.render('login', { backLink: '/' });
};

exports.post = async (req, res) => {
  const { loginusername, loginpassword } = req.body;
  try {
    const foundUser = await getUser(loginusername);
    bcrypt.compare(loginpassword, foundUser.password, function(err, result) {
      if (result) {
        req.session.username = loginusername;
        req.session.loggedIn = true;
        res.redirect(`/usercontent/${loginusername}`);
      } else {
        res.render('login', {
          errorMessage: 'Password is incorrect'
        });
      }
    });
  } catch (err) {
    res.render('login', {
      errorMessage: 'User does not exist',
    });
  }
};
