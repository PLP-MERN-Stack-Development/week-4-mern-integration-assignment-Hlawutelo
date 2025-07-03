import React, { useEffect, useState } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + '/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await fetch(import.meta.env.VITE_API_URL + '/categories/' + id, { method: 'DELETE' });
    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + '/categories/' + editingId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName })
    });
    setEditingId(null);
    fetchCategories();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {editingId === cat._id ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
                <input value={editName} onChange={e => setEditName(e.target.value)} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {cat.name}
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
