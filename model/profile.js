const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const profile = mongoose.model("Profile", profileSchema);

module.exports = profile;