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
        const { data, error } = await supabase.from('books').select('*').eq('id', bookId).single();
        if (error) throw error;
        if (data) setBook(data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };

    const checkExistingRequest = async () => {
      if (!user || !bookId) return;
      try {
        const { data } = await supabase.from('requests').select('id').eq('book_id', bookId).eq('from_user_id', user.id).maybeSingle();
        if (data) setRequestSent(true);
      } catch (error) {
        console.error("Error checking for existing request:", error);
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
        book_id: book.id, book_title: book.title, from_user_id: user.id,
        from_user_name: user.email, to_user_id: book.lender_id, to_user_name: book.lender_email,
        status: 'pending'
      });
      if (error) throw error;
      setRequestSent(true);
      alert('Request sent successfully! You can manage it from your Profile page.');
    } catch (err) {
      console.error("Error sending request:", err);
      alert('Failed to send request.');
    }
  };

  if (loading) return <div className="text-center font-semibold text-xl">Loading Book Details...</div>;
  if (!book) return <div className="text-center font-bold text-xl text-red-500">Book not found.</div>;

  const isOwner = user && user.id === book.lender_id;
 const subject = encodeURIComponent(`Request for book: ${book.title}`);
const body = encodeURIComponent(`Hi, I'm interested in borrowing "${book.title}".`);
const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${book.lender_email}&su=${subject}&body=${body}`;


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={book.image_url || 'https://via.placeholder.com/400x500.png?text=No+Image'} alt={book.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
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
            {isOwner && (
                <div className="w-full bg-gray-200 text-gray-600 text-center py-3 rounded-lg font-semibold">This is your book listing</div>
            )}
            
            {!isOwner && user && (
                <>
                    <button 
                        onClick={handleRequest} 
                        disabled={requestSent || book.is_borrowed} 
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {book.is_borrowed ? "Currently Borrowed" : requestSent ? 'Request Already Sent' : 'Request to Borrow'}
                    </button>
                   
                    <ChatButton currentUser={user} otherUserId={book.lender_id} otherUserName={book.lender_email} />
                    
                    <a href={mailtoLink} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                        Contact Lender via Email
                    </a>
                </>
            )}

            {!user && (
                <div className="w-full bg-gray-100 text-gray-700 text-center p-4 rounded-lg">
                    <p>Please <a href="/login" className="text-green-600 font-bold hover:underline">log in</a> to request or chat about this book.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;