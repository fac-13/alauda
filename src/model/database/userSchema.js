const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String, index: { unique: true }, lowercase: true, trim: true,
  },
  password: {
    type: String, trim: true,
  },
  time : {type: String}, 
  like: [String]
},
{ timestamps: true }); 

const User = mongoose.model('User', UserSchema);

module.exports = { User };
