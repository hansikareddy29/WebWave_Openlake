// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img 
        src={book.imageUrl || 'https://via.placeholder.com/300x400.png?text=No+Image'} 
        alt={book.title} 
        className="w-full h-56 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="mt-2">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            {book.subject}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{book.college}</p>
        <p className="text-sm text-gray-700 mt-2">Condition: {book.condition}</p>
        <p className="text-sm font-medium mt-2">
          Available for: <span className="capitalize">{book.availability}</span>
        </p>
        <div className="mt-4">
          <a 
            href={`mailto:${book.lenderEmail}`}
            className="w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 block"
          >
            Contact Lender
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;