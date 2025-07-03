import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
