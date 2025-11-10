// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const conditionStyles = {
  'Like New': 'bg-green-100 text-green-800',
  'Good': 'bg-yellow-100 text-yellow-800',
  'Acceptable': 'bg-red-100 text-red-800',
};

const BookCard = ({ book }) => {
  const conditionClass = conditionStyles[book.condition] || 'bg-gray-100 text-gray-800';

  return (
    <Link to={`/book/${book.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
        <img 
          src={book.imageUrl || 'https://via.placeholder.com/400x500.png?text=BookCycle'} 
          alt={book.title} 
          className="w-full h-64 object-cover" 
        />
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 truncate" title={book.title}>{book.title}</h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-indigo-600 bg-indigo-200">
              {book.subject}
            </span>
            <span className={`text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full ${conditionClass}`}>
              {book.condition}
            </span>
          </div>
          <div className="mt-auto pt-4">
             <p className="text-sm text-gray-500">{book.college || 'Location not specified'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;