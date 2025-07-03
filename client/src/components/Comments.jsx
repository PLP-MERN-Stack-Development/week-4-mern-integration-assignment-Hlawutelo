import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post(`/comments/${postId}`, { author, content });
      setAuthor('');
      setContent('');
      fetchComments(); // Refresh comments
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleDelete = async (commentId) => {
    setError('');
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}:</strong> {comment.content}
            <button onClick={() => handleDelete(comment._id)} style={{ marginLeft: '1em' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
