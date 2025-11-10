// src/components/DashboardStats.jsx
import React from 'react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="text-3xl mr-4 text-green-500">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="My Listed Books" value={stats.listedBooks} icon="📚" />
      <StatCard title="Books Borrowed" value={stats.borrowedBooks} icon="📖" />
      <StatCard title="Pending Requests" value={stats.pendingRequests} icon="⏳" />
      <StatCard title="Completed Swaps" value={stats.completedSwaps} icon="♻️" />
    </div>
  );
};

export default DashboardStats;