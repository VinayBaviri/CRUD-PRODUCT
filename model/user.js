const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  userData: { type: Object, required: true }
});

const user = mongoose.model("User", userSchema);

module.exports = user;