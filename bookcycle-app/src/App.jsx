// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Authentication from "./pages/Authentication";


// 1. Import 'auth' from firebase.js along with 'db'
import { auth, db } from './firebase'; 

import { onAuthStateChanged } from 'firebase/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import MyBooks from './pages/MyBooks';
import Login from './pages/Login';

function App() {
  // This is good for debugging, you can keep it
  console.log("Firebase connected. Auth:", auth, "DB:", db);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Use 'auth' here, not 'db'. This is the main fix.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // A protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;