const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  topic: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
