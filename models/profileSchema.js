const mongoose = require("mongoose");
const validator = require("validator");

let Schema = mongoose.Schema;

// let profileSchema = new Schema({
//   firstName: String,
//   lastName: String,
//   username: String,
//   password: String,
//   email: String,
//   created: { type: Date, default: Date.now },
//   profilePic: String,
//   registered: { type: Date, default: Date.now }
// });

let profileSchema = new Schema({
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  username: {type: String, trim: true},
  password: { type: String, require: true, minlength: 8 },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  created: { type: Date, default: Date.now },
  profilePic: String,
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    }
  }],
  registered: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profileSchema);
