const express = require('express');
const blogRouter = express.Router();
const { Blog } = require ("../models/blogs");
const { auth } = require('../middleware/auth');

blogRouter.use(auth);

// GET all blogs
// Merged route for getting blogs
blogRouter.get('/', async (req, res) => {
    try {
      if (req.query.title) {
        const title = req.query.title;
        await Blog.find({ title: title });
      } else if (req.query.category) {
        const category = req.query.category;
        await Blog.find({ category: category });
      } else {
        await Blog.find();
      }
  
      res.status(200).json({msg:"all the blogs",blogs:req.body});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// GET blogs sorted by date
blogRouter.get('/blog/sort', async (req, res) => {
  const sort = req.query.sort;
  const order = req.query.order === 'asc' ? 1 : -1;
  try {
    const blogs = await Blog.find().sort({ date: order });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new blog
blogRouter.post("/blog", async(req,res) =>{
    try{
        const blog =new Blog(req.body);
        await blog.save();
        res.status(200).json({msg:"post has been added",blog:req.body})
      } catch(err){
        res.status(400).json({error:err.message});
      }; 
});

// PATCH edit a blog
blogRouter.patch('/blog/:id', async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a blog
blogRouter.delete('/blog/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH like a blog
blogRouter.patch('/blog/:id/like', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1}},
      { new: true }
    );
    res.status(200).json({msg:"likes increased",blog:updatedBlog});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH comment on a blog
blogRouter.patch('/blog/:id/comment', async (req, res) => {
  const { content,user } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user,content } } },
      { new: true }
    );
    res.status(200).json({msg:"comment added by user",comment:updatedBlog});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
    blogRouter
};
