const { User } = require('./../database/userSchema');

async function getUser(data) {
//    let userfound = User.findOne({username: data}, function(err, document) {
//        if (err){
//            console.log(err);
//        }else{
//            console.log(document);
//        }
    
//   });
  return User.findOne({username: data});
}

module.exports = { getUser };