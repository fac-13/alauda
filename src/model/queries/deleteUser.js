const { User } = require('./../database/userSchema');

async function deleteUser(data) {
    console.log('You have reached delete user', data);
  return User.remove({username: data});
}

module.exports = { deleteUser };