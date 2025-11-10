// // src/pages/Chat.jsx
// import React from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import ChatBox from '../components/ChatBox';

// const Chat = ({ user }) => {
//   const { chatId } = useParams();
//   const location = useLocation();
//   const otherUserName = location.state?.otherUserName || 'Chat';

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Chat with {otherUserName}</h1>
//       <div className="max-w-3xl mx-auto">
//         <ChatBox chatId={chatId} currentUser={user} />
//       </div>
//     </div>
//   );
// };

// export default Chat;
// src/pages/Chat.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

const Chat = ({ user }) => {
  const { chatId } = useParams();

  if (!user) {
    return <div>Please log in to chat.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Chat Room</h1>
      <ChatBox chatId={chatId} currentUser={user} />
    </div>
  );
};

export default Chat;