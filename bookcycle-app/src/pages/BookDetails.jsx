// src/pages/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, get, set } from 'firebase/database';
import ChatButton from '../components/ChatButton'; // Import the new component

const BookDetails = ({ user }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => { /* ... existing fetchBook logic ... */ const fetchBook = async () => { try { const bookRef = ref(db, `books/${bookId}`); const snapshot = await get(bookRef); if (snapshot.exists()) { setBook({ id: bookId, ...snapshot.val() }); } } catch (err) { console.error(err); } finally { setLoading(false); } }; fetchBook(); }, [bookId]);

  const handleRequest = async () => { /* ... existing handleRequest logic ... */ if (!user) { navigate('/auth'); return; } if (user.uid === book.lenderId) { alert("You cannot request your own book."); return; } try { const requestId = `${book.id}_${user.uid}`; const requestRef = ref(db, `requests/${requestId}`); await set(requestRef, { bookId: book.id, bookTitle: book.title, fromUserId: user.uid, fromUserName: user.displayName || user.email, toUserId: book.lenderId, toUserName: book.lenderEmail, status: 'pending', requestedAt: new Date().toISOString() }); setRequestSent(true); alert('Request sent successfully!'); } catch (err) { console.error(err); alert('Failed to send request.'); } };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!book) return <div className="text-center font-bold text-xl">Book not found.</div>;

  const isOwner = user && user.uid === book.lenderId;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={book.imageUrl || 'https://via.placeholder.com/400x500.png?text=No+Image'} alt={book.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p><span className="font-semibold">Subject:</span> {book.subject}</p>
            <p><span className="font-semibold">Location:</span> {book.college || 'N/A'}</p>
            <p><span className="font-semibold">Condition:</span> {book.condition}</p>
            <p><span className="font-semibold">Lender:</span> {book.lenderEmail}</p>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={handleRequest}
              disabled={requestSent || isOwner || book.isBorrowed}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isOwner ? "This is your book" : book.isBorrowed ? "Currently Borrowed" : requestSent ? 'Request Sent!' : 'Request to Borrow'}
            </button>
            {/* FEATURE #6: The "Start Chat" button is implemented here */}
            {!isOwner && user && (
              <ChatButton
                currentUser={user}
                otherUserId={book.lenderId}
                otherUserName={book.lenderEmail}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;