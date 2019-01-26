const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/bloglist"
);

const blogSeed = [
  {
    topic: "How to use this Blog",
    author: "Blog Master",
    synopsis:
      "The purpose of this blog is to connect with others to help or get help with coding.  Stay positive and be respectful.  Thank you foring using our site",
    date: new Date(Date.now())
  },
  
];

db.Blog
  .remove({})
  .then(() => db.blogs.collection.insertMany(blogSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
