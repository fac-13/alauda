const { User } = require('./../database/userSchema');

async function getUser(data) {
  return User.findOne({username: data});
}

module.exports = { getUser };