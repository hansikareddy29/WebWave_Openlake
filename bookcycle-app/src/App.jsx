import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import MyBooks from './pages/MyBooks';
import Login from './pages/Login';
import Chat from './pages/Chat';  // ✅ NEW IMPORT

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed, user is:", currentUser?.email || "logged out");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen font-bold text-xl">
        Loading BookCycle...
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route path="/login" element={<Login />} />

          <Route 
            path="/add-book" 
            element={
              <ProtectedRoute>
                <AddBook user={user} />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/my-books" 
            element={
              <ProtectedRoute>
                <MyBooks user={user} />
              </ProtectedRoute>
            } 
          />

         <Route 
            path="/chat/:chatId" 
            element={
              <ProtectedRoute>
                <Chat user={user} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
