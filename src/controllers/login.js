const bcrypt = require('bcryptjs');
const u = require('./../model/queries/getUser');

exports.get = (req, res) => {
  res.render('login');
};

exports.post = (req, res) => {
  const { loginusername, loginpassword } = req.body;
  console.log('login username: ', loginusername);
  console.log('login password: ', loginpassword);
  u.getUser(loginusername);
//   }catch (err) {
//     console.log(err);
//   }
  
//   console.log(uu);
};
//   bcrypt
//     .hash(password, 10)
//     .then(password => newUser.create({ username, password }))
//     .then(() => res.render('thankYou', { user: username }))
//     .catch((err) => {
//       if (err.message.includes('duplicate')) {
//         res.render('signup', { err: 'This username is already taken!' });
//       } else {
//         console.log(err);
//         // render error page
//       }
//     });
// };