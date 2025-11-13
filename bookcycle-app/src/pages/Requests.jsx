import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import RequestCard from '../components/RequestCard'; 

const Requests = ({ user }) => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchRequests = async () => {
    if (!user) return; 
    setLoading(true);
    
    // Fetch incoming requests (where the current user is the book owner)
    const { data: inData, error: inError } = await supabase
      .from('requests')
      .select('*')
      .eq('to_user_id', user.id)
      .order('created_at', { ascending: false });

    if (inError) console.error("Error fetching incoming requests:", inError);
    
    // Fetch outgoing requests (where the current user is the requester)
    const { data: outData, error: outError } = await supabase
      .from('requests')
      .select('*')
      .eq('from_user_id', user.id)
      .order('created_at', { ascending: false });

    if (outError) console.error("Error fetching outgoing requests:", outError);
    
    setIncoming(inData || []);
    setOutgoing(outData || []);
    setLoading(false);
  };

  // Run the fetch function once when the component loads or when the user changes
  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleUpdateRequest = async (requestId, bookId, newStatus, dueDate = null) => {
    try {
      const { error: reqErr } = await supabase
        .from('requests')
        .update({ status: newStatus, due_date: dueDate })
        .eq('id', requestId);
      if (reqErr) throw reqErr;

      const isBorrowed = newStatus === 'accepted';
      const { error: bookErr } = await supabase
        .from('books')
        .update({ is_borrowed: isBorrowed })
        .eq('id', bookId);
      if (bookErr) throw bookErr;

      fetchRequests();

    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update the request.");
    }
  };

  const handleAccept = (request) => {
    const weeks = prompt("How many weeks will you lend the book for? (e.g., 4)", "4");
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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Book Requests</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Requests</h2>
        {loading ? <p>Loading...</p> : incoming.length > 0 ? (
          <div className="space-y-4">
            {incoming.map(req => (
              <RequestCard 
                user={user} 
                key={req.id} 
                request={req} 
                type="incoming" 
                onAccept={handleAccept} 
                onDecline={handleDecline} 
                onMarkReturned={handleMarkReturned} 
              />
            ))}
          </div>
        ) : <p className="text-gray-500">You have no incoming requests.</p>}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outgoing Requests</h2>
        {loading ? <p>Loading...</p> : outgoing.length > 0 ? (
          <div className="space-y-4">
            {outgoing.map(req => (
              <RequestCard 
                user={user} 
                key={req.id} 
                request={req} 
                type="outgoing" 
              />
            ))}
          </div>
        ) : <p className="text-gray-500">You haven't requested any books yet.</p>}
      </div>
    </div>
  );
};

export default Requests;