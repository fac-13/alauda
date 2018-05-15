const bcrypt = require('bcryptjs');
const { getUser } = require('./../model/queries/getUser');

exports.get = (req, res) => {
  res.render('login');
};

exports.post = async (req, res) => {
  const { loginusername, loginpassword } = req.body;
  console.log('login username: ', loginusername);
  console.log('login password: ', loginpassword);
  try {
    const foundUser = await getUser(loginusername);
    console.log(foundUser);
    bcrypt.compare(loginpassword, foundUser.password, function (err, result) {
      if (result === true) {
        console.log('authenticated');
      } else {
        console.log('NOT authenticated');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
