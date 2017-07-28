const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema({
  title: String,
  author: String,
  content: String,
  created: { type: Date, default: Date.now },
  tags: [String],
  comments: [
    {
      user: String,
      created: { type: Date, default: Date.now },
      content: String
    }
  ],
  votes: { type: Number, default: 0 },
  imagelink: String,
});

module.exports = mongoose.model('Post', postSchema);