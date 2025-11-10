// src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';

const ChatBox = ({ chatId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    push(messagesRef, {
      text: newMessage,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email,
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.senderId === currentUser.uid ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm font-bold mb-1">{msg.senderId === currentUser.uid ? 'You' : msg.senderName}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-right opacity-75 mt-1">{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Sending...'}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;