import React from 'react';
import BookCard from './BookCard';


const BookList = ({ books, loading, currentUser, isOwnerView }) => { 
    
    if (loading) {
        return <div className="text-center p-10 text-xl text-gray-500">Loading books...</div>;
    }

    if (!books || books.length === 0) {
        return <div className="text-center p-10 text-xl text-gray-500">No books found matching your criteria.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {books.map(book => (
                <BookCard 
                    key={book.id} 
                    book={book} 
                    currentUser={currentUser} 
                    isOwnerView={isOwnerView} 
                />
            ))}
        </div>
    );
};

export default BookList;