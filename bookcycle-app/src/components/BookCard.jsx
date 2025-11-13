import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const BookCard = ({ book, context, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"? This cannot be undone.`)) {
        const { error } = await supabase.from('books').delete().eq('id', book.id);
        if (error) {
            alert("Failed to delete book.");
            console.error("Delete error:", error);
        } else if (onDelete) {
            onDelete(book.id);
        }
    }
  };

  let daysRemaining = null;
  if (book.is_borrowed && book.due_date) {
    const dueDate = new Date(book.due_date);
    const now = new Date();
    daysRemaining = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="relative">
        <Link to={`/book/${book.id}`} className="block">
          <img 
            src={book.image_url || 'https://via.placeholder.com/400x500.png?text=BookCycle'} 
            alt={book.title} 
            className={`w-full h-64 object-cover cursor-pointer ${book.is_borrowed ? 'opacity-50' : ''}`}
          />
        </Link>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/book/${book.id}`}><h3 className="text-xl font-bold text-gray-800 truncate hover:text-green-600 cursor-pointer" title={book.title}>{book.title}</h3></Link>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="mt-3 flex flex-wrap gap-2"><span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-green-600 bg-green-200">{book.subject}</span></div>
        {book.distance !== undefined && book.distance !== Infinity && (<p className="mt-3 text-sm font-bold text-blue-600">📍 Approx. {book.distance.toFixed(1)} km away</p>)}
        <p className="text-sm text-gray-500 mt-3 flex-grow">{book.college}</p>
        
        <div className="mt-auto pt-4">
          {context === 'my-books' ? (
            <div className="flex gap-2">
                <Link to={`/book/${book.id}`} className="w-full block text-center bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition-colors text-sm">View Details</Link>
                <button onClick={handleDelete} className="w-full block text-center bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-semibold transition-colors text-sm">Delete</button>
            </div>
          ) : (
            book.is_borrowed && daysRemaining > 0 ? (
                <div className="w-full block text-center bg-red-500 text-white py-2.5 rounded-lg font-semibold">
                    Available in {daysRemaining} days
                </div>
            ) : (
                <Link to={`/book/${book.id}`} className="w-full block text-center bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 font-semibold transition-colors">
                    View Details & Request
                </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;