// // // src/pages/Home.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { db } from '../firebase';
// // import { ref, onValue } from 'firebase/database';
// // import BookList from '../components/BookList';
// // import FilterBar from '../components/FilterBar';

// // const Home = () => {
// //   const [books, setBooks] = useState([]);
// //   const [filteredBooks, setFilteredBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filters, setFilters] = useState({
// //     subject: '', condition: '', availability: '', location: ''
// //   });

// //   useEffect(() => {
// //     const booksRef = ref(db, 'books');
// //     const unsubscribe = onValue(booksRef, (snapshot) => {
// //       const data = snapshot.val();
// //       const loadedBooks = [];
// //       for (const key in data) {
// //         // Only show books that are not part of an active 'accepted' request
// //         if (!data[key].isBorrowed) {
// //           loadedBooks.push({ id: key, ...data[key] });
// //         }
// //       }
// //       const sortedBooks = loadedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //       setBooks(sortedBooks);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   // FEATURE #8 & #2: Logic for Smart Search & Location Filter is here
// //   const applyFilters = useCallback(() => {
// //     let booksToFilter = [...books];
// //     if (filters.subject) {
// //       booksToFilter = booksToFilter.filter(b => b.subject.toLowerCase().includes(filters.subject.toLowerCase()));
// //     }
// //     if (filters.condition) {
// //       booksToFilter = booksToFilter.filter(b => b.condition === filters.condition);
// //     }
// //     if (filters.availability) {
// //       booksToFilter = booksToFilter.filter(b => b.availability === filters.availability);
// //     }
// //     if (filters.location) {
// //       booksToFilter = booksToFilter.filter(b => b.college && b.college.toLowerCase().includes(filters.location.toLowerCase()));
// //     }
// //     setFilteredBooks(booksToFilter);
// //   }, [books, filters]);

// //   useEffect(() => {
// //     applyFilters();
// //   }, [filters, applyFilters]);

// //   const handleFilterChange = (newFilters) => {
// //     setFilters(newFilters);
// //   };

// //   return (
// //     <div>
// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
// //         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
// //           Find affordable textbooks for your courses or give your old books a new life.
// //         </p>
// //       </div>
// //       <FilterBar onFilterChange={handleFilterChange} />
// //       <BookList books={filteredBooks} loading={loading} />
// //     </div>
// //   );
// // };

// // export default Home;
// // src/pages/Home.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { db } from '../firebase';
// import { ref, onValue } from 'firebase/database';
// import BookList from '../components/BookList';
// import FilterBar from '../components/FilterBar';

// const Home = ({ user }) => {  // ✅ Receive 'user' prop from App.js
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     subject: '', condition: '', availability: '', location: ''
//   });

//   useEffect(() => {
//     const booksRef = ref(db, 'books');
//     const unsubscribe = onValue(booksRef, (snapshot) => {
//       const data = snapshot.val();
//       const loadedBooks = [];
//       for (const key in data) {
//         // Only show books that are not part of an active 'accepted' request
//         if (!data[key].isBorrowed) {
//           loadedBooks.push({ id: key, ...data[key] });
//         }
//       }
//       const sortedBooks = loadedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setBooks(sortedBooks);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Apply filters (subject, condition, availability, location)
//   const applyFilters = useCallback(() => {
//     let booksToFilter = [...books];
//     if (filters.subject) {
//       booksToFilter = booksToFilter.filter(b => b.subject?.toLowerCase().includes(filters.subject.toLowerCase()));
//     }
//     if (filters.condition) {
//       booksToFilter = booksToFilter.filter(b => b.condition === filters.condition);
//     }
//     if (filters.availability) {
//       booksToFilter = booksToFilter.filter(b => b.availability === filters.availability);
//     }
//     if (filters.location) {
//       booksToFilter = booksToFilter.filter(b => b.college && b.college.toLowerCase().includes(filters.location.toLowerCase()));
//     }
//     setFilteredBooks(booksToFilter);
//   }, [books, filters]);

//   useEffect(() => {
//     applyFilters();
//   }, [filters, applyFilters]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div>
//       <div className="text-center mb-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
//         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
//           Find affordable textbooks for your courses or give your old books a new life.
//         </p>
//       </div>

//       <FilterBar onFilterChange={handleFilterChange} />

//       {/* ✅ Pass current user to BookList */}
//       <BookList books={filteredBooks} loading={loading} currentUser={user} />
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // <-- IMPORT SUPABASE
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        setBooks(data);
        setFilteredBooks(data);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const results = books.filter(book =>
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery) ||
      book.subject.toLowerCase().includes(lowercasedQuery) ||
      (book.college && book.college.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredBooks(results);
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
          Join a community of students sharing knowledge. Find affordable textbooks for your courses or give your old books a new life.
        </p>
      </div>
      <SearchBar onSearch={handleSearch} />
      <BookList books={filteredBooks} loading={loading} />
    </div>
  );
};

export default Home;