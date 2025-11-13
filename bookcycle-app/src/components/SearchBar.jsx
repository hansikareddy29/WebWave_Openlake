
// import React, { useState } from 'react';

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     // ✅ CHANGE IS HERE: Removed 'mx-auto' to make the component more flexible
//     <form onSubmit={handleSubmit} className="w-full max-w-2xl">
//       <div className="relative flex items-center shadow-lg rounded-full">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by title, subject, college..."
//           className="w-full py-3 px-6 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
//         />
//         <button type="submit" className="absolute right-1 top-1 bottom-1 bg-green-600 text-white px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
//           Search
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;
// src/components/SearchBar.jsx (Modified)
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    // Remove w-full max-w-2xl here, let the parent Home.jsx control the width
    <form onSubmit={handleSubmit} className="w-full">
      {/* FIX: Use a flex container with rounded corners and overflow-hidden.
        The input now has no right border/rounding, and the button has no left rounding.
      */}
      <div className="flex items-center shadow-lg rounded-xl overflow-hidden border border-gray-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, college..."
          // Input fills remaining space, uses full height, and has no rounded-corners
          className="flex-grow py-3 px-6 text-lg focus:outline-none"
        />
        {/* Button is green, has no left rounded corner, and is not absolutely positioned */}
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