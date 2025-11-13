import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
   
    <form onSubmit={handleSubmit} className="w-full">
      
      <div className="flex items-center shadow-lg rounded-xl overflow-hidden border border-gray-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, college..."
          
          className="flex-grow py-3 px-6 text-lg focus:outline-none"
        />
       
        <button 
          type="submit" 
          className="flex-shrink-0 bg-green-600 text-white font-semibold px-6 py-3 hover:bg-green-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;