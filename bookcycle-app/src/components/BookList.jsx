import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, loading, context, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center text-gray-500 text-xl py-10">
        <p>Loading books...</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl py-10">
        <p>😔 No books found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          context={context} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default BookList;