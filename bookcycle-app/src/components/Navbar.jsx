// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db } from '../firebase';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">📚 BookCycle</Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-green-200">Home</Link>
            {user ? (
              <>
                <Link to="/my-books" className="hover:text-green-200">My Books</Link>
                <Link to="/add-book" className="hover:text-green-200">Add Book</Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-white text-green-600 hover:bg-gray-100 px-3 py-1 rounded font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;