const { User } = require('./../database/userSchema');

async function deleteUser(data) {
  return User.remove({username: data});
}

module.exports = { deleteUser };