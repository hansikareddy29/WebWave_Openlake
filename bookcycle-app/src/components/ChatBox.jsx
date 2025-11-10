import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';

const ChatBox = ({ chatId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 1. Fetch initial messages for the chat room
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // 2. Set up a real-time subscription to listen for new messages
    const subscription = supabase
      // FIX 2: Correct template literal usage for channel name
      .channel(`chat_${chatId}`) 
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages', 
          // FIX 3: Correct template literal usage for the filter string
          filter: `chat_id=eq.${chatId}` 
        },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    // 3. Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !currentUser) return;

    const messageToSend = {
      chat_id: chatId,
      sender_id: currentUser.id,
      text: newMessage.trim(),
    };

    const { error } = await supabase.from('messages').insert(messageToSend);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          // FIX 4a: Correct template literal usage for outer div
          <div key={index} className={`flex mb-4 ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            {/* FIX 4b: Correct template literal usage for inner div */}
            <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender_id === currentUser.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm font-bold mb-1">{msg.sender_id === currentUser.id ? 'You' : 'Lender'}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-right opacity-75 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
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