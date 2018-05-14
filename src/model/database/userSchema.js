const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String, required: true, index: { unique: true }, lowercase: true, trim: true,
  },
  password: {
    type: String, required: true, trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
