const { User } = require('./../database/userSchema');

function create(data) {
  const user = new User(data);
  return user.save();
}

module.exports = { create };
