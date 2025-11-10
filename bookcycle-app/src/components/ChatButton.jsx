
// src/components/ChatButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    // Create a consistent chat ID regardless of who starts the chat
    const chatId = [currentUser.uid, otherUserId].sort().join('_');
    
    navigate(`/chat/${chatId}`, {
      state: { otherUserName: otherUserName }
    });
  };

  return (
    <button
      onClick={handleStartChat}
      className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
    >
      Chat with {otherUserName}
    </button>
  );
};

export default ChatButton;