// src/pages/Requests.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, query, orderByChild, equalTo, onValue, update } from 'firebase/database';
import RequestCard from '../components/RequestCard';

const Requests = ({ user }) => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { /* ... existing useEffect logic ... */ if (!user) return; const requestsRef = ref(db, 'requests'); const incomingQuery = query(requestsRef, orderByChild('toUserId'), equalTo(user.uid)); const outgoingQuery = query(requestsRef, orderByChild('fromUserId'), equalTo(user.uid)); const unsubIncoming = onValue(incomingQuery, (snapshot) => { const data = snapshot.val(); setIncoming(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []); setLoading(false); }); const unsubOutgoing = onValue(outgoingQuery, (snapshot) => { const data = snapshot.val(); setOutgoing(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []); setLoading(false); }); return () => { unsubIncoming(); unsubOutgoing(); }; }, [user]);

  const handleUpdateRequest = async (requestId, bookId, newStatus, dueDate = null) => {
    const requestRef = ref(db, `requests/${requestId}`);
    const bookRef = ref(db, `books/${bookId}`);
    
    const updates = {};
    updates[`requests/${requestId}/status`] = newStatus;
    if (dueDate) {
      updates[`requests/${requestId}/dueDate`] = dueDate;
    }
    
    // Update the book's status
    if (newStatus === 'accepted') {
        updates[`books/${bookId}/isBorrowed`] = true;
    } else if (newStatus === 'returned' || newStatus === 'declined') {
        updates[`books/${bookId}/isBorrowed`] = false;
    }
    
    await update(ref(db), updates);
  };

  // FEATURE #4: Due date is set here when accepting a request
  const handleAccept = (request) => {
    const weeks = prompt("How many weeks to lend the book for? (e.g., 4)", "4");
    if (weeks && !isNaN(weeks) && parseInt(weeks) > 0) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parseInt(weeks) * 7);
      handleUpdateRequest(request.id, request.bookId, 'accepted', dueDate.toISOString());
    } else {
        alert("Please enter a valid number of weeks.");
    }
  };

  const handleDecline = (request) => handleUpdateRequest(request.id, request.bookId, 'declined');
  const handleMarkReturned = (request) => handleUpdateRequest(request.id, request.bookId, 'returned');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Book Requests</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Requests</h2>
        {loading ? <p>Loading...</p> : incoming.length > 0 ? (
          <div className="space-y-4">
            {incoming.map(req => <RequestCard user={user} key={req.id} request={req} type="incoming" onAccept={handleAccept} onDecline={handleDecline} onMarkReturned={handleMarkReturned} />)}
          </div>
        ) : <p className="text-gray-500">No incoming requests.</p>}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outgoing Requests</h2>
        {loading ? <p>Loading...</p> : outgoing.length > 0 ? (
          <div className="space-y-4">
            {outgoing.map(req => <RequestCard user={user} key={req.id} request={req} type="outgoing" />)}
          </div>
        ) : <p className="text-gray-500">You haven't requested any books.</p>}
      </div>
    </div>
  );
};

export default Requests;