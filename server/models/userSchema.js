const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  count: {
    type: Number,
    default: 1, 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], 
  },
  lastLoginDate: {
    type: Date,
    default: Date.now, 
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
