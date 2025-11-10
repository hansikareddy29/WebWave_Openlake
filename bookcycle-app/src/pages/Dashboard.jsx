// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({ listedBooks: 0, borrowedBooks: 0, pendingRequests: 0, completedSwaps: 0 });
  const [dueSoon, setDueSoon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch stats
    const booksRef = query(ref(db, 'books'), orderByChild('lenderId'), equalTo(user.uid));
    const requestsRef = ref(db, 'requests');
    const incomingReq = query(requestsRef, orderByChild('toUserId'), equalTo(user.uid));
    const outgoingReq = query(requestsRef, orderByChild('fromUserId'), equalTo(user.uid));

    const unsubs = [
      onValue(booksRef, snap => setStats(s => ({ ...s, listedBooks: snap.size }))),
      onValue(incomingReq, snap => {
        let pending = 0;
        let completed = 0;
        snap.forEach(child => {
          if (child.val().status === 'pending') pending++;
          if (child.val().status === 'returned') completed++;
        });
        setStats(s => ({ ...s, pendingRequests: pending, completedSwaps: (s.completedSwaps || 0) + completed }));
      }),
      onValue(outgoingReq, snap => {
        let borrowed = 0;
        let completed = 0;
        const due = [];
        const now = new Date();
        snap.forEach(child => {
          const req = child.val();
          if (req.status === 'accepted') {
            borrowed++;
            // FEATURE #4: Logic to find and display due date reminders is here
            if (req.dueDate && new Date(req.dueDate) > now) {
                due.push({title: req.bookTitle, dueDate: req.dueDate});
            }
          }
          if (req.status === 'returned') completed++;
        });
        setDueSoon(due);
        setStats(s => ({ ...s, borrowedBooks: borrowed, completedSwaps: (s.completedSwaps || 0) + completed }));
      })
    ];
    
    setLoading(false);
    return () => unsubs.forEach(unsub => unsub());
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to your Dashboard, {user.displayName || user.email}!</h1>
      <p className="text-gray-600 mb-8">Here's a summary of your BookCycle activity.</p>
      
      {loading ? <p>Loading stats...</p> : <DashboardStats stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Due Date Reminders</h2>
          {dueSoon.length > 0 ? (
            <ul className="space-y-3">
              {dueSoon.map((item, i) => (
                <li key={i} className="p-3 bg-red-50 rounded-md text-red-700">
                  Return '{item.title}' by <strong>{new Date(item.dueDate).toLocaleDateString()}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No books are currently due.</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/add-book" className="w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors">List a New Book</Link>
            <Link to="/requests" className="w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors">View Requests</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;