const { User } = require('./../database/userSchema');

async function getUsersByTime(data) {
    console.log(data);
  return User.find({time: data});
}

module.exports = { getUsersByTime };