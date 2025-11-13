import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
  const navigate = useNavigate();

  const startChat = async () => {
    if (!currentUser || !otherUserId) return;

    try {
      
      const { data: existingChat, error: fetchError } = await supabase
        .from('chats')
        .select('id')
        
        .or(`and(user1_id.eq.${currentUser.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${currentUser.id})`)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { 
        throw fetchError;
      }

      if (existingChat) {
       
        navigate(`/chat/${existingChat.id}`); 
      } else {
       
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