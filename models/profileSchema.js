const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let profileSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  created: { type: Date, default: Date.now },
  profilePic: String,
  registered: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Profile', profileSchema);