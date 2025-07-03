import React, { useState, useEffect } from 'react';

const EditPost = ({ postId, onUpdated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts/' + postId)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
      });
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/posts/' + postId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category })
      });
      if (res.ok) {
        setMessage('Post updated!');
        onUpdated && onUpdated();
      } else {
        setMessage('Failed to update post');
      }
    } catch {
      setMessage('Error updating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category ID"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <button type="submit">Update</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default EditPost;
