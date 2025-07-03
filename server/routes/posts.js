const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const upload = require('../middleware/upload');

// @route   GET /api/posts
// @desc    Get all blog posts with pagination, search, and category filter
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) {
      query.category = category;
    }
    const posts = await Post.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    const total = await Post.countDocuments(query);
    res.json({
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Create a new blog post (with optional image upload)
// @access  Public
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = new Post({ title, content, category, featuredImage: imageUrl });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// @route   POST /api/posts
// @desc    Create a new blog post (with optional image upload)
// @access  Public
router.post(
  '/',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content, category } = req.body;
      let imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      const post = new Post({ title, content, category, featuredImage: imageUrl });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Update an existing blog post
// @access  Public
  try {
    const { title, content, category } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// @route   PUT /api/posts/:id
// @desc    Update an existing blog post
// @access  Public
router.put(
  '/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content, category } = req.body;
      const updated = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content, category },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Post not found' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Delete a blog post
// @access  Public
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// @route   DELETE /api/posts/:id
// @desc    Delete a blog post
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
