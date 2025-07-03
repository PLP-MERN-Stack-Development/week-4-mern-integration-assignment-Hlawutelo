import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category })
      });
      if (res.ok) {
        setMessage('Post created!');
        setTitle('');
        setContent('');
        setCategory('');
      } else {
        setMessage('Failed to create post');
      }
    } catch {
      setMessage('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
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
      <button type="submit">Create</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CreatePost;
