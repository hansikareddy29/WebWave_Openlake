import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import ChatButton from '../components/ChatButton';

const Requests = ({ user }) => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    
    // Fetch requests where the current user is the book owner
    const { data: inData, error: inError } = await supabase
      .from('requests')
      .select('*')
      .eq('to_user_id', user.id)
      .order('created_at', { ascending: false });

    if (inError) console.error("Error fetching incoming requests:", inError);
    
    // Fetch requests where the current user is the one asking for the book
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

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleUpdateRequest = async (requestId, bookId, newStatus, dueDate = null) => {
    try {
      // Update the request's status and due date
      const { error: reqErr } = await supabase
        .from('requests')
        .update({ status: newStatus, due_date: dueDate })
        .eq('id', requestId);
      if (reqErr) throw reqErr;

      // Update the book's availability status
      const isBorrowed = newStatus === 'accepted';
      const { error: bookErr } = await supabase
        .from('books')
        .update({ is_borrowed: isBorrowed })
        .eq('id', bookId);
      if (bookErr) throw bookErr;

      // Refresh the lists to show the change
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
  
  const RequestCard = ({ request, type }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        declined: 'bg-red-100 text-red-800',
        returned: 'bg-blue-100 text-blue-800',
    };
    const currentStatusStyle = statusStyles[request.status] || 'bg-gray-100 text-gray-800';

    return (
      <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <Link to={`/book/${request.book_id}`} className="font-bold text-lg text-green-700 hover:underline">{request.book_title}</Link>
          <p className="text-sm text-gray-600">
            {type === 'incoming' ? `From: ${request.from_user_name}` : `To: ${request.to_user_name}`}
          </p>
          {request.status === 'accepted' && request.due_date && (
            <p className="text-sm text-red-600 font-medium mt-1">Due: {new Date(request.due_date).toLocaleDateString()}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <div className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full text-center ${currentStatusStyle}`}>{request.status}</div>
          {type === 'incoming' && request.status === 'pending' && (
            <>
              <button onClick={() => handleAccept(request)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm font-semibold">Accept</button>
              <button onClick={() => handleDecline(request)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm font-semibold">Decline</button>
            </>
          )}
          {type === 'incoming' && request.status === 'accepted' && (
            <button onClick={() => handleMarkReturned(request)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-semibold">Mark as Returned</button>
          )}
          {user && (
            <div className="mt-2 md:mt-0">
              <ChatButton currentUser={user} otherUserId={type === 'incoming' ? request.from_user_id : request.to_user_id} otherUserName={type === 'incoming' ? request.from_user_name : request.to_user_name} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Book Requests</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Requests</h2>
        {loading ? <p>Loading...</p> : incoming.length > 0 ? (
          <div className="space-y-4">
            {incoming.map(req => <RequestCard key={req.id} request={req} type="incoming" />)}
          </div>
        ) : <p className="text-gray-500">You have no incoming requests.</p>}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outgoing Requests</h2>
        {loading ? <p>Loading...</p> : outgoing.length > 0 ? (
          <div className="space-y-4">
            {outgoing.map(req => <RequestCard key={req.id} request={req} type="outgoing" />)}
          </div>
        ) : <p className="text-gray-500">You haven't requested any books yet.</p>}
      </div>
    </div>
  );
};

export default Requests;