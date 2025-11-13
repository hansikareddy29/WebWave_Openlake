import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import BookList from '../components/BookList';

// This component now receives the 'user' prop from App.js
const MyBooks = ({ user }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      // This ensures we only fetch data when we know who the user is.
      // Without the 'user' prop, this would always be false.
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      // This is the Supabase query to get books for the specific logged-in user.
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('lender_id', user.id) // Filter for books where lender_id matches the current user's ID
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching my books:", error);
      } else {
        setMyBooks(data);
      }
      setLoading(false);
    };

    fetchMyBooks();
  }, [user]); // This effect re-runs if the user logs in or out

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Listed Books</h1>
      <BookList books={myBooks} loading={loading} />
    </div>
  );
};

export default MyBooks;