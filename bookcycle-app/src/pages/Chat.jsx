import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

const Chat = ({ user }) => {
  const { chatId } = useParams();

  if (!user) {
    return <div className="text-center font-bold text-xl">Please log in to chat.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Chat Room</h1>
      <div className="max-w-2xl mx-auto">
        <ChatBox chatId={chatId} currentUser={user} />
      </div>
    </div>
  );
};

export default Chat;