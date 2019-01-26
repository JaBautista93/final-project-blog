import axios from "axios";

export default {
  // Gets all blogs
  getBlogs: function() {
    return axios.get("/api/blogs");
  },
  // Gets the blog with the given id
  getBlog: function(id) {
    return axios.get("/api/blogs/" + id);
  },
  // Deletes the blog with the given id
  deleteBlog: function(id) {
    return axios.delete("/api/blogs/" + id);
  },
  // Saves a blog to the database
  saveBlog: function(blogData) {
    return axios.post("/api/blogs", blogData);
  }
};
