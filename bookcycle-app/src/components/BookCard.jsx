import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
const mailSubject = `Request for book on BookCycle: ${book.title}`;
  const mailtoLink = `mailto:${book.lender_email}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col">
     <Link to={`/book/${book.id}`}>
        <img 
          src={book.image_url || 'https://via.placeholder.com/400x500.png?text=BookCycle'} 
          alt={book.title} 
          className="w-full h-64 object-cover cursor-pointer" 
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
       <Link to={`/book/${book.id}`}>
          <h3 className="text-xl font-bold text-gray-800 truncate hover:text-green-600 cursor-pointer" title={book.title}>
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600">by {book.author}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-green-600 bg-green-200">
            {book.subject}
          </span>
        </div>
 {book.distance !== undefined && book.distance !== Infinity && (
            <p className="mt-3 text-sm font-bold text-blue-600">
                📍 Approx. {book.distance.toFixed(1)} km away
            </p>
        )}

        <p className="text-sm text-gray-500 mt-3">{book.college}</p>
        
        <div className="mt-auto pt-4">
          <a 
            href={mailtoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            Contact Lender
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;