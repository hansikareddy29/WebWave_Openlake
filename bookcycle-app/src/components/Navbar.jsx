import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
            📚 BookCycle
          </Link>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
            
            {user ? (
              <>
                
                <Link to="/profile" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Profile</Link>
                <Link to="/add-book" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Add Book</Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition-colors text-sm">
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