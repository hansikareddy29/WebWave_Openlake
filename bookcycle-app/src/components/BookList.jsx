// src/components/BookList.jsx
import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, loading }) => {
  if (loading) {
    return <div className="text-center">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-center text-gray-500">No books found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;