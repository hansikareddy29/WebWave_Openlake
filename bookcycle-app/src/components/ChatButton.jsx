import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
  const navigate = useNavigate();

  const startChat = async () => {
    if (!currentUser || !otherUserId) {
      alert('You must be logged in to start a chat.');
      return;
    }

    try {
      // Check if a chat already exists between these two users (in either direction)
      const { data: existingChat, error: fetchError } = await supabase
        .from('chats')
        .select('id')
        .or(`(user1_id.eq.${currentUser.id},user2_id.eq.${otherUserId}),(user1_id.eq.${otherUserId},user2_id.eq.${currentUser.id})`)
        .single();

      // PGRST116 is the code for "No rows found", which is not an actual error in this case.
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingChat) {
        // If a chat room already exists, navigate to it
        navigate(`/chat/${existingChat.id}`);
      } else {
        // If no chat room exists, create a new one
        const { data: newChat, error: insertError } = await supabase
          .from('chats')
          .insert({ user1_id: currentUser.id, user2_id: otherUserId })
          .select()
          .single();

        if (insertError) throw insertError;

        if (newChat) {
          navigate(`/chat/${newChat.id}`);
        }
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Could not start chat session.');
    }
  };

  return (
    <button
      onClick={startChat}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      Start Chat with {otherUserName}
    </button>
  );
};

export default ChatButton;