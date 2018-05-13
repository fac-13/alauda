const UserModel = require('./../database/userSchema');

async function create(data) {
  const user = new UserModel(data);
  return user.save();
}

module.exports = { create };
