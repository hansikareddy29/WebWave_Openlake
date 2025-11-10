// src/pages/MyBooks.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import BookList from '../components/BookList';

const MyBooks = ({ user }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      if (!user) return; // Make sure we have a user
        
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', user.id) // 💡 NOTE: Changed to 'user_id' to match common Supabase foreign keys and BookCard logic
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching my books:", error);
      } else {
        setMyBooks(data);
      }
      setLoading(false);
    };
    fetchMyBooks();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Listed Books</h1>
      
      {/* ✅ MODIFIED: Pass both the user object (as currentUser) and the 
        isOwnerView flag to tell BookList/BookCard not to render the ChatButton. 
      */}
      <BookList 
            books={myBooks} 
            loading={loading} 
            currentUser={user}
            isOwnerView={true} // <-- NEW FLAG to suppress the chat button
      />
    </div>
  );
};

export default MyBooks;