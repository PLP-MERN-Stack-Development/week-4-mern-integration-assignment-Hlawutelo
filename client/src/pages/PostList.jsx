import React, { useEffect, useState } from 'react';
import EditPost from './EditPost';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + '/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch posts');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(import.meta.env.VITE_API_URL + '/posts/' + id, { method: 'DELETE' });
    setPosts(posts.filter((p) => p._id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {editingId === post._id ? (
              <EditPost postId={post._id} onUpdated={() => { setEditingId(null); fetchPosts(); }} />
            ) : (
              <>
                <Link to={`/post/${post._id}`}><strong>{post.title}</strong></Link>
                <button onClick={() => setEditingId(post._id)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
