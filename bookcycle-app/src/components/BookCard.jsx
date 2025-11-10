// import React from 'react';
// import ChatButton from './ChatButton';

// const BookCard = ({ book, currentUser }) => {
//   const showChat = currentUser && book.userId !== currentUser.uid;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
//       <h2 className="text-xl font-bold">{book.title}</h2>
//       <p>Author: {book.author}</p>
//       <p>Condition: {book.condition}</p>
//       <p>City: {book.city}</p>
//       {showChat && (
//         <ChatButton
//           currentUser={currentUser}
//           otherUserId={book.userId}
//           otherUserName={book.ownerName || 'Seller'}
//         />
//       )}
//     </div>
//   );
// };

// export default BookCard;
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
      <img 
        // ✅ CORRECTED LINE: Changed book.imageUrl to book.image_url
        src={book.image_url || 'https://via.placeholder.com/400x500.png?text=BookCycle'} 
        alt={book.title} 
        className="w-full h-64 object-cover" 
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate" title={book.title}>{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-green-600 bg-green-200">
            {book.subject}
          </span>
          <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-blue-600 bg-blue-200">
            {book.condition}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-3">{book.college || 'General'}</p>
        
        <p className="mt-3 text-sm font-medium">
          Available for: <span className="capitalize text-indigo-600">{book.availability}</span>
        </p>
        
        <div className="mt-5">
          <a 
            // Also updated the mailto link to use book.lender_email
            href={`mailto:${book.lender_email}?subject=Request for book: ${book.title}`}
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