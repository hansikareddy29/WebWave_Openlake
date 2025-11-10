// // src/pages/Requests.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { ref, query, orderByChild, equalTo, onValue, update } from 'firebase/database';
// import RequestCard from '../components/RequestCard';

// const Requests = ({ user }) => {
//   const [incoming, setIncoming] = useState([]);
//   const [outgoing, setOutgoing] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { /* ... existing useEffect logic ... */ if (!user) return; const requestsRef = ref(db, 'requests'); const incomingQuery = query(requestsRef, orderByChild('toUserId'), equalTo(user.uid)); const outgoingQuery = query(requestsRef, orderByChild('fromUserId'), equalTo(user.uid)); const unsubIncoming = onValue(incomingQuery, (snapshot) => { const data = snapshot.val(); setIncoming(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []); setLoading(false); }); const unsubOutgoing = onValue(outgoingQuery, (snapshot) => { const data = snapshot.val(); setOutgoing(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []); setLoading(false); }); return () => { unsubIncoming(); unsubOutgoing(); }; }, [user]);

//   const handleUpdateRequest = async (requestId, bookId, newStatus, dueDate = null) => {
//     const requestRef = ref(db, `requests/${requestId}`);
//     const bookRef = ref(db, `books/${bookId}`);
    
//     const updates = {};
//     updates[`requests/${requestId}/status`] = newStatus;
//     if (dueDate) {
//       updates[`requests/${requestId}/dueDate`] = dueDate;
//     }
    
//     // Update the book's status
//     if (newStatus === 'accepted') {
//         updates[`books/${bookId}/isBorrowed`] = true;
//     } else if (newStatus === 'returned' || newStatus === 'declined') {
//         updates[`books/${bookId}/isBorrowed`] = false;
//     }
    
//     await update(ref(db), updates);
//   };

//   // FEATURE #4: Due date is set here when accepting a request
//   const handleAccept = (request) => {
//     const weeks = prompt("How many weeks to lend the book for? (e.g., 4)", "4");
//     if (weeks && !isNaN(weeks) && parseInt(weeks) > 0) {
//       const dueDate = new Date();
//       dueDate.setDate(dueDate.getDate() + parseInt(weeks) * 7);
//       handleUpdateRequest(request.id, request.bookId, 'accepted', dueDate.toISOString());
//     } else {
//         alert("Please enter a valid number of weeks.");
//     }
//   };

//   const handleDecline = (request) => handleUpdateRequest(request.id, request.bookId, 'declined');
//   const handleMarkReturned = (request) => handleUpdateRequest(request.id, request.bookId, 'returned');

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Book Requests</h1>
      
//       <div className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Requests</h2>
//         {loading ? <p>Loading...</p> : incoming.length > 0 ? (
//           <div className="space-y-4">
//             {incoming.map(req => <RequestCard user={user} key={req.id} request={req} type="incoming" onAccept={handleAccept} onDecline={handleDecline} onMarkReturned={handleMarkReturned} />)}
//           </div>
//         ) : <p className="text-gray-500">No incoming requests.</p>}
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outgoing Requests</h2>
//         {loading ? <p>Loading...</p> : outgoing.length > 0 ? (
//           <div className="space-y-4">
//             {outgoing.map(req => <RequestCard user={user} key={req.id} request={req} type="outgoing" />)}
//           </div>
//         ) : <p className="text-gray-500">You haven't requested any books.</p>}
//       </div>
//     </div>
//   );
// };

// export default Requests;
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
// Assuming you have this component
// import RequestCard from '../components/RequestCard';

const Requests = ({ user }) => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRequests = async () => {
      setLoading(true);
      
      const { data: inData, error: inError } = await supabase.from('requests').select(`*`).eq('to_user_id', user.id);
      if (inError) console.error("Error fetching incoming requests:", inError);
      
      const { data: outData, error: outError } = await supabase.from('requests').select(`*`).eq('from_user_id', user.id);
      if (outError) console.error("Error fetching outgoing requests:", outError);
      
      setIncoming(inData || []);
      setOutgoing(outData || []);
      setLoading(false);
    };
    fetchRequests();
  }, [user]);

  const handleUpdateRequest = async (requestId, bookId, newStatus, dueDate = null) => {
    try {
      // Update the request status and potentially the due date
      const { error: reqErr } = await supabase.from('requests').update({ status: newStatus, due_date: dueDate }).eq('id', requestId);
      if (reqErr) throw reqErr;

      // Update the book's borrowed status based on the new request status
      const isBorrowed = newStatus === 'accepted';
      const { error: bookErr } = await supabase.from('books').update({ is_borrowed: isBorrowed }).eq('id', bookId);
      if (bookErr) throw bookErr;

      // Refresh the local state to show the change immediately
      setIncoming(prev => prev.map(req => req.id === requestId ? { ...req, status: newStatus, due_date: dueDate } : req));

    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update the request.");
    }
  };

  const handleAccept = (request) => {
    const weeks = prompt("How many weeks to lend the book for? (e.g., 4)", "4");
    if (weeks && !isNaN(weeks) && parseInt(weeks) > 0) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parseInt(weeks) * 7);
      handleUpdateRequest(request.id, request.book_id, 'accepted', dueDate.toISOString());
    } else {
        alert("Please enter a valid number of weeks.");
    }
  };

  const handleDecline = (request) => handleUpdateRequest(request.id, request.book_id, 'declined');
  const handleMarkReturned = (request) => handleUpdateRequest(request.id, request.book_id, 'returned');
  
  // A simple card component to display request info
  const RequestCard = ({ request, type }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
            <p className="font-bold">{request.book_title}</p>
            <p className="text-sm text-gray-600">
                {type === 'incoming' ? From: $`{request.from_user_name} : To: ${request.to_user_name}`}
            </p>
            <p className="text-sm text-gray-500">Status: <span className="font-semibold">{request.status}</span></p>
        </div>
        {type === 'incoming' && request.status === 'pending' && (
            <div className="flex gap-2">
                <button onClick={() => handleAccept(request)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Accept</button>
                <button onClick={() => handleDecline(request)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Decline</button>
            </div>
        )}
        {type === 'incoming' && request.status === 'accepted' && (
            <button onClick={() => handleMarkReturned(request)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Mark as Returned</button>
        )}
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Book Requests</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Requests</h2>
        {loading ? <p>Loading...</p> : incoming.length > 0 ? (
          <div className="space-y-4">
            {incoming.map(req => <RequestCard key={req.id} request={req} type="incoming" />)}
          </div>
        ) : <p className="text-gray-500">No incoming requests.</p>}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outgoing Requests</h2>
        {loading ? <p>Loading...</p> : outgoing.length > 0 ? (
          <div className="space-y-4">
            {outgoing.map(req => <RequestCard key={req.id} request={req} type="outgoing" />)}
          </div>
        ) : <p className="text-gray-500">You haven't requested any books.</p>}
      </div>
    </div>
  );
};

export default Requests;