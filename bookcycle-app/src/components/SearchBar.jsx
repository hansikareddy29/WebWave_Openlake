// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full max-w-2xl mx-auto">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, college..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-r-md hover:bg-green-700">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;