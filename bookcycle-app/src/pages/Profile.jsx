import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const calendarStyles = `
.react-calendar { border-radius: 0.5rem; border: 1px solid #e5e7eb; width: 100% !important; }
.react-calendar__tile--active { background: #10B981 !important; color: white !important; }
.react-calendar__tile--now { background: #D1FAE5 !important; }
.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus { background-color: #f3f4f6; }
.due-date-marker-borrowed { height: 8px; width: 8px; background-color: #EF4444; border-radius: 50%; margin: 4px auto 0; }
.due-date-marker-lent { height: 8px; width: 8px; background-color: #10B981; border-radius: 50%; margin: 4px auto 0; }
`;

const Profile = ({ user }) => {
  const [stats, setStats] = useState({ listedBooks: 0, borrowedBooks: 0, pendingRequests: 0, completedSwaps: 0 });
  const [borrowedDue, setBorrowedDue] = useState([]);
  const [lentDue, setLentDue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      const { count: listedBooksCount } = await supabase.from('books').select('*', { count: 'exact', head: true }).eq('lender_id', user.id);
      const { data: requests, error } = await supabase.from('requests').select('*').or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`);
      if (error) { console.error("Error fetching dashboard data:", error); setLoading(false); return; }

      let borrowedCount = 0, pendingCount = 0, completedCount = 0;
      const borrowedDueDates = [], lentDueDates = [];
      const now = new Date();
      
      if (requests) {
        requests.forEach(req => {
          const isAcceptedAndActive = req.status === 'accepted' && req.due_date && new Date(req.due_date) > now;
          if (req.from_user_id === user.id && req.status === 'accepted') borrowedCount++;
          if (req.to_user_id === user.id && req.status === 'pending') pendingCount++;
          if (req.status === 'returned') completedCount++;
          if (req.from_user_id === user.id && isAcceptedAndActive) {
            borrowedDueDates.push({ title: req.book_title, dueDate: new Date(req.due_date) });
          }
          if (req.to_user_id === user.id && isAcceptedAndActive) {
            lentDueDates.push({ title: req.book_title, dueDate: new Date(req.due_date) });
          }
        });
      }
      
      setStats({ listedBooks: listedBooksCount || 0, borrowedBooks: borrowedCount, pendingRequests: pendingCount, completedSwaps: completedCount });
      setBorrowedDue(borrowedDueDates);
      setLentDue(lentDueDates);
      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  const highlightDueDates = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const isBorrowedDueDate = borrowedDue.some(item => item.dueDate.toDateString() === dateString);
      if (isBorrowedDueDate) return <div className="due-date-marker-borrowed" title="A book you borrowed is due"></div>;
      const isLentDueDate = lentDue.some(item => item.dueDate.toDateString() === dateString);
      if (isLentDueDate) return <div className="due-date-marker-lent" title="A book you lent is due back"></div>;
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <style>{calendarStyles}</style>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center gap-6"><img src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} alt="Profile Avatar" className="w-24 h-24 rounded-full border-4 border-green-200" /><div><h1 className="text-3xl font-bold text-gray-800">{user.user_metadata?.full_name || user.email}</h1><p className="text-gray-600">{user.email}</p></div></div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Activity</h2>
      {loading ? <p>Loading stats...</p> : (<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center"><p className="text-3xl font-bold">{stats.listedBooks}</p><p className="text-gray-500">Books Listed</p></div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center"><p className="text-3xl font-bold">{stats.borrowedBooks}</p><p className="text-gray-500">Books Borrowed</p></div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center"><p className="text-3xl font-bold">{stats.pendingRequests}</p><p className="text-gray-500">Pending Requests</p></div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center"><p className="text-3xl font-bold">{stats.completedSwaps}</p><p className="text-gray-500">Completed Swaps</p></div>
      </div>)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Due Date Calendar</h2>
          <Calendar tileContent={highlightDueDates} />
          <div className="mt-4 space-y-2">
            {borrowedDue.length > 0 && (<div className="flex items-center gap-2 text-sm text-red-700"><div className="h-3 w-3 bg-red-500 rounded-full"></div><span>Books you need to return.</span></div>)}
            {lentDue.length > 0 && (<div className="flex items-center gap-2 text-sm text-green-700"><div className="h-3 w-3 bg-green-500 rounded-full"></div><span>Books to be returned to you.</span></div>)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2><div className="flex flex-col sm:flex-row gap-4"><Link to="/add-book" className="w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors">List a New Book</Link><Link to="/requests" className="w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors">View My Requests</Link></div></div>
      </div>
    </div>
  );
};

export default Profile;