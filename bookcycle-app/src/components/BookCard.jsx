import React from 'react';
import ChatButton from './ChatButton';

const BookCard = ({ book, currentUser }) => {
  const showChat = currentUser && book.userId !== currentUser.uid;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Condition: {book.condition}</p>
      <p>City: {book.city}</p>
      {showChat && (
        <ChatButton
          currentUser={currentUser}
          otherUserId={book.userId}
          otherUserName={book.ownerName || 'Seller'}
        />
      )}
    </div>
  );
};

export default BookCard;
