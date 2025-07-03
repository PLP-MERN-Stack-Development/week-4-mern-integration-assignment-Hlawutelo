const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const router = express.Router();

// GET /api/comments/:postId - Get all comments for a post
router.get('/:postId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// POST /api/comments/:postId - Add a comment to a post
router.post(
  '/:postId',
  [
    body('author').notEmpty().withMessage('Author is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { author, content } = req.body;
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      const comment = new Comment({ post: req.params.postId, author, content });
      await comment.save();
      post.comments.push(comment._id);
      await post.save();
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/comments/:commentId - Delete a comment
router.delete('/:commentId', async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    // Remove comment reference from post
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
