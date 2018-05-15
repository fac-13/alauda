const bcrypt = require('bcryptjs');
const newUser = require('./../model/queries/createUser');

const convertTime = (time) => {
  let reversedTime = time.split(':').reverse().join(' '); 
  time = "00 " + reversedTime + " * * 1-7"; 
  return time; 
 }
 

exports.get = (req, res) => {
  res.render('signup');
};

exports.post = (req, res) => {
  let { username, password, wakeUpTime, like } = req.body;
  const time = convertTime(wakeUpTime); 
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


