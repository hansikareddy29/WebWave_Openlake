import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import BookList from '../components/BookList';

const MyBooks = ({ user }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from('books').select('*').eq('lender_id', user.id).order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching my books:", error);
      } else {
        setMyBooks(data || []);
      }
      setLoading(false);
    };
    fetchMyBooks();
  }, [user]);

  
  const handleBookDeleted = (deletedBookId) => {
    setMyBooks(currentBooks => currentBooks.filter(book => book.id !== deletedBookId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Listed Books</h1>
      
      <BookList books={myBooks} loading={loading} context="my-books" onDelete={handleBookDeleted} />
    </div>
  );
};

export default MyBooks;