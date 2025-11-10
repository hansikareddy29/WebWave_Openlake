
// // // src/components/ChatButton.jsx
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
// //   const navigate = useNavigate();

// //   const handleStartChat = () => {
// //     // Create a consistent chat ID regardless of who starts the chat
// //     const chatId = [currentUser.uid, otherUserId].sort().join('_');
    
// //     navigate(`/chat/${chatId}`, {
// //       state: { otherUserName: otherUserName }
// //     });
// //   };

// //   return (
// //     <button
// //       onClick={handleStartChat}
// //       className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
// //     >
// //       Chat with {otherUserName}
// //     </button>
// //   );
// // };

// // export default ChatButton;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabase';

// const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
//   const navigate = useNavigate();

//   const startChat = async () => {
//     if (!currentUser || !otherUserId) return;

//     try {
//       // Check if a chat already exists between these two users
//       const { data: existingChat, error: fetchError } = await supabase
//         .from('chats')
//         .select('id')
//         .or((user1_id.eq.${currentUser.id},user2_id.eq.${otherUserId}),(user1_id.eq.${otherUserId},user2_id.eq.${currentUser.id}))
//         .single();

//       if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
//         throw fetchError;
//       }

//       if (existingChat) {
//         // If chat exists, navigate to it
//         navigate(/chat/$`{existingChat.id}`);
//       } else {
//         // If chat doesn't exist, create a new one
//         const { data: newChat, error: insertError } = await supabase
//           .from('chats')
//           .insert({ user1_id: currentUser.id, user2_id: otherUserId })
//           .select()
//           .single();

//         if (insertError) throw insertError;

//         if (newChat) {
//           navigate(/chat/${newChat.id});
//         }
//       }
//     } catch (error) {
//       console.error('Error starting chat:', error);
//       alert('Could not start chat session.');
//     }
//   };

//   return (
//     <button
//       onClick={startChat}
//       className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//     >
//       Start Chat with {otherUserName}
//     </button>
//   );
// };

// export default ChatButton;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const ChatButton = ({ currentUser, otherUserId, otherUserName }) => {
  const navigate = useNavigate();

  const startChat = async () => {
    if (!currentUser || !otherUserId) return;

    try {
      // 1. Check if a chat already exists between these two users
      // FIX 1: Correct template literal usage inside .or()
      const { data: existingChat, error: fetchError } = await supabase
        .from('chats')
        .select('id')
        .or(`and(user1_id.eq.${currentUser.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${currentUser.id})`)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
        throw fetchError;
      }

      if (existingChat) {
        // If chat exists, navigate to it
        // FIX 2: Correct template literal usage for navigation URL
        navigate(`/chat/${existingChat.id}`); 
      } else {
        // If chat doesn't exist, create a new one
        const { data: newChat, error: insertError } = await supabase
          .from('chats')
          // Ensure IDs are inserted in a consistent order (e.g., alphabetically) if your table doesn't rely on the OR logic above.
          // For simplicity with the OR logic check, inserting as is works:
          .insert({ user1_id: currentUser.id, user2_id: otherUserId })
          .select()
          .single();

        if (insertError) throw insertError;

        if (newChat) {
          // FIX 3: Correct template literal usage for navigation URL
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