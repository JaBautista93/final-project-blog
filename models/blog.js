const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  topic: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String, required: true },
  response: Array,
  date: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
