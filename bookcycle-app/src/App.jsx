import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

// --- Layout Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Page Components ---
import Home from './pages/Home';
import Login from './pages/Login';
import AddBook from './pages/AddBook';
import MyBooks from './pages/MyBooks';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Chat from './pages/Chat';
import Authentication from './pages/Authentication';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen font-bold text-xl">Loading BookCycle...</div>;
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/book/:bookId" element={<BookDetails user={user} />} />
          <Route path="/add-book" element={<ProtectedRoute><AddBook user={user} /></ProtectedRoute>} />
          <Route path="/my-books" element={<ProtectedRoute><MyBooks user={user} /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests user={user} /></ProtectedRoute>} />
          {/* ✅ ADD THIS NEW ROUTE FOR THE CHAT PAGE */}
          <Route path="/chat/:chatId" element={<ProtectedRoute><Chat user={user} /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;