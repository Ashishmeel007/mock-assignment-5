// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user:String,
      content: { type: String, required: true }
    }
  ],
  user: String,
  userID:String,
},{
    versionKey:false
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
    Blog
};
