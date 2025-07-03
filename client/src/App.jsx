// Main application component
import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoryList from './pages/CategoryList';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';

function App() {
  return (
    <div>
      <h1>Welcome to MERN Blog</h1>
      <Register />
      <Login />
      <CategoryList />
      <CreatePost />
      <PostList />
    </div>
  );
}

export default App;
