import React from 'react';
import { Link } from 'react-router-dom';
import ChatButton from './ChatButton';

const RequestCard = ({ user, request, type, onAccept, onDecline, onMarkReturned }) => {

  
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    declined: 'bg-red-100 text-red-800',
    returned: 'bg-blue-100 text-blue-800',
  };

  
  const currentStatusStyle = statusStyles[request.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      {/* Left side: Request Information */}
      <div className="flex-1">
        <Link 
          to={`/book/${request.book_id}`} 
          className="font-bold text-lg text-green-700 hover:underline"
        >
          {request.book_title}
        </Link>
        <p className="text-sm text-gray-600">
          {type === 'incoming' ? `Request from: ${request.from_user_name}` : `Request to: ${request.to_user_name}`}
        </p>
        {request.status === 'accepted' && request.due_date && (
          <p className="text-sm text-red-600 font-medium mt-1">
            Due: {new Date(request.due_date).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Right side: Status Pill and Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
        
        {/* Status Pill */}
        <div className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full text-center ${currentStatusStyle}`}>
          {request.status}
        </div>

        {/* Conditional Action Buttons for Incoming Requests */}
        {type === 'incoming' && request.status === 'pending' && (
          <>
            <button onClick={() => onAccept(request)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm font-semibold">Accept</button>
            <button onClick={() => onDecline(request)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm font-semibold">Decline</button>
          </>
        )}
        {type === 'incoming' && request.status === 'accepted' && (
          <button onClick={() => onMarkReturned(request)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-semibold">Mark as Returned</button>
        )}

        {/* Chat Button (always visible for interaction) */}
        {user && (
          <div className="mt-2 md:mt-0">
            
            <ChatButton 
              currentUser={user}
              otherUserId={type === 'incoming' ? request.from_user_id : request.to_user_id}
              otherUserName={type === 'incoming' ? request.from_user_name : request.to_user_name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;