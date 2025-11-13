import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import ChatButton from '../components/ChatButton';

const BookDetails = ({ user }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('id', bookId)
          .single(); 

        if (error) throw error;
        
        if (data) {
          setBook(data);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };
    const checkExistingRequest = async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from('requests')
            .select('id')
            .eq('book_id', bookId)
            .eq('from_user_id', user.id)
            .single();

        if (data) {
            setRequestSent(true);
        }
    };

    fetchBook();
    checkExistingRequest();
  }, [bookId, user]);

  const handleRequest = async () => {
    if (!user) { navigate('/login'); return; }
    if (user.id === book.lender_id) { alert("You cannot request your own book."); return; }
    
    try {
      const { error } = await supabase.from('requests').insert({
        book_id: book.id,
        book_title: book.title,
        from_user_id: user.id,
        from_user_name: user.email, 
        to_user_id: book.lender_id,
        to_user_name: book.lender_email,
        status: 'pending'
      });
      if (error) throw error;
      setRequestSent(true);
      alert('Request sent successfully!');
    } catch (err) {
      console.error("Error sending request:", err);
      alert('Failed to send request.');
    }
  };
  if (loading) {
    return <div className="text-center font-semibold text-xl">Loading Book Details...</div>;
  }
  if (!book) {
    return <div className="text-center font-bold text-xl text-red-500">Book not found.</div>;
  }

  const isOwner = user && user.id === book.lender_id;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        
        <img 
          src={book.image_url || 'https://via.placeholder.com/400x500.png?text=No+Image'} 
          alt={book.title} 
          className="w-full h-auto object-cover rounded-lg shadow-md" 
        />
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
          
          <div className="mt-4 space-y-2 text-gray-700">
            <p><span className="font-semibold">Subject:</span> {book.subject}</p>
            <p><span className="font-semibold">Location:</span> {book.college || 'N/A'}</p>
            <p><span className="font-semibold">Condition:</span> {book.condition}</p>
            <p><span className="font-semibold">Lender:</span> {book.lender_email}</p>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={handleRequest}
              disabled={requestSent || isOwner || book.is_borrowed}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isOwner ? "This is your book" : book.is_borrowed ? "Currently Borrowed" : requestSent ? 'Request Already Sent' : 'Request to Borrow'}
            </button>
            {!isOwner && user && (
              <ChatButton
                currentUser={user}
                otherUserId={book.lender_id}
                otherUserName={book.lender_email}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;