// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthListener from './hooks/useAuthListener';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import MyBooks from './pages/MyBooks';
import Authentication from './pages/Authentication';
import Requests from './pages/Requests';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import BookDetails from './pages/BookDetails';

function App() {
  const { user, loading } = useAuthListener();

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading BookCycle...</div>;
  }

  // A protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/book/:bookId" element={<BookDetails user={user} />} />
          
          <Route path="/add-book" element={<ProtectedRoute><AddBook user={user} /></ProtectedRoute>} />
          <Route path="/my-books" element={<ProtectedRoute><MyBooks user={user} /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests user={user} /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
          <Route path="/chat/:chatId" element={<ProtectedRoute><Chat user={user} /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;