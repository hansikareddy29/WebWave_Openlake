// src/components/RequestCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ChatButton from './ChatButton'; // Import ChatButton

const RequestCard = ({ user, request, type, onAccept, onDecline, onMarkReturned }) => {
  // ... (keep the existing styling logic for status pills)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* ... (existing request info div) ... */}
      <div className="flex-1">
        <Link to={`/book/${request.bookId}`} className="font-bold text-lg text-green-700 hover:underline">{request.bookTitle}</Link>
        <p className="text-sm text-gray-600">
          {type === 'incoming' ? `Request from: ${request.fromUserName}` : `Request to: ${request.toUserName}`}
        </p>
        {request.status === 'accepted' && request.dueDate && (
          <p className="text-sm text-red-600 font-medium mt-1">Due: {new Date(request.dueDate).toLocaleDateString()}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
        {/* ... (existing status pill and action buttons) ... */}
         {type === 'incoming' && request.status === 'pending' && (
          <>
            <button onClick={() => onAccept(request)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm">Accept</button>
            <button onClick={() => onDecline(request)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">Decline</button>
          </>
        )}
        {type === 'incoming' && request.status === 'accepted' && (
          <button onClick={() => onMarkReturned(request)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">Mark as Returned</button>
        )}

        {/* FEATURE #6: Chat button added to requests */}
        {user && (
          <div className="mt-2 md:mt-0 md:ml-2">
            <ChatButton 
              currentUser={user}
              otherUserId={type === 'incoming' ? request.fromUserId : request.toUserId}
              otherUserName={type === 'incoming' ? request.fromUserName : request.toUserName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;