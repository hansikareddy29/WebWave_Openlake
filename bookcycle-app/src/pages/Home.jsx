// // // // import React, { useState, useEffect } from 'react';
// // // // import { supabase } from '../supabase';
// // // // import SearchBar from '../components/SearchBar';
// // // // import BookList from '../components/BookList';
// // // // import { getDistance } from 'geolib';

// // // // const Home = () => {
// // // //   const [books, setBooks] = useState([]);
// // // //   const [filteredBooks, setFilteredBooks] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isLocating, setIsLocating] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchBooks = async () => {
// // // //       setLoading(true);
// // // //       const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
// // // //       if (error) {
// // // //         console.error("Error fetching books:", error);
// // // //       } else {
// // // //         setBooks(data);
// // // //         setFilteredBooks(data);
// // // //       }
// // // //       setLoading(false);
// // // //     };
// // // //     fetchBooks();
// // // //   }, []);

// // // //   const handleSearch = (query) => {
// // // //     if (!query) {
// // // //       setFilteredBooks(books);
// // // //       return;
// // // //     }
// // // //     const lowercasedQuery = query.toLowerCase();
// // // //     const results = books.filter(book =>
// // // //       book.title.toLowerCase().includes(lowercasedQuery) ||
// // // //       book.author.toLowerCase().includes(lowercasedQuery) ||
// // // //       book.subject.toLowerCase().includes(lowercasedQuery) ||
// // // //       (book.college && book.college.toLowerCase().includes(lowercasedQuery))
// // // //     );
// // // //     setFilteredBooks(results);
// // // //   };

// // // //   // This function gets the user's location and sorts books by distance
// // // //   const findBooksNearMe = () => {
// // // //     setIsLocating(true);
// // // //     if (!navigator.geolocation) {
// // // //       alert("Geolocation is not supported by your browser.");
// // // //       setIsLocating(false);
// // // //       return;
// // // //     }

// // // //     navigator.geolocation.getCurrentPosition(
// // // //       (position) => {
// // // //         const { latitude, longitude } = position.coords;

// // // //         const booksWithDistance = books.map(book => {
// // // //           if (book.latitude && book.longitude) {
// // // //             const distanceInMeters = getDistance(
// // // //               { latitude, longitude },
// // // //               { latitude: book.latitude, longitude: book.longitude }
// // // //             );
// // // //             return { ...book, distance: distanceInMeters / 1000 }; // Convert to km
// // // //           }
// // // //           return { ...book, distance: Infinity }; // Put books without a location at the end
// // // //         });

// // // //         // Sort the books array by the new 'distance' property
// // // //         const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
        
// // // //         setFilteredBooks(sortedBooks);
// // // //         setIsLocating(false);
// // // //       },
// // // //       (error) => {
// // // //         console.error("Error getting user location:", error);
// // // //         alert("Could not get your location. Please ensure you have enabled location services in your browser settings.");
// // // //         setIsLocating(false);
// // // //       }
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <div className="text-center mb-10">
// // // //         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
// // // //         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
// // // //           Find affordable textbooks for your courses or give your old books a new life.
// // // //         </p>
// // // //       </div>
// // // //       <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
// // // //         <div className="flex-grow max-w-2xl">
// // // //             <SearchBar onSearch={handleSearch} />
// // // //         </div>
// // // //         <button 
// // // //           onClick={findBooksNearMe}
// // // //           disabled={isLocating}
// // // //           className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
// // // //         >
// // // //           {isLocating ? 'Finding...' : '📍 Find Books Near Me'}
// // // //         </button>
// // // //       </div>
// // // //       <BookList books={filteredBooks} loading={loading} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;
// // // import React, { useState, useEffect } from 'react';
// // // import { supabase } from '../supabase';
// // // import SearchBar from '../components/SearchBar';
// // // import BookList from '../components/BookList';
// // // import { getDistance } from 'geolib';

// // // // ✅ CHANGE IS HERE: The component now receives the 'user' prop
// // // const Home = ({ user }) => {
// // //   const [books, setBooks] = useState([]);
// // //   const [filteredBooks, setFilteredBooks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isLocating, setIsLocating] = useState(false);

// // //   useEffect(() => {
// // //     const fetchBooks = async () => {
// // //       // ✅ CHANGE IS HERE: Only fetch books if a user is logged in
// // //       if (!user) {
// // //         setBooks([]);
// // //         setFilteredBooks([]);
// // //         setLoading(false);
// // //         return;
// // //       }
// // //       setLoading(true);
// // //       const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
// // //       if (error) {
// // //         console.error("Error fetching books:", error);
// // //       } else {
// // //         setBooks(data);
// // //         setFilteredBooks(data);
// // //       }
// // //       setLoading(false);
// // //     };
// // //     fetchBooks();
// // //   }, [user]); // This effect now re-runs when the user's login status changes

// // //   const handleSearch = (query) => {
// // //     if (!query) {
// // //       setFilteredBooks(books);
// // //       return;
// // //     }
// // //     const lowercasedQuery = query.toLowerCase();
// // //     const results = books.filter(book =>
// // //       book.title.toLowerCase().includes(lowercasedQuery) ||
// // //       book.author.toLowerCase().includes(lowercasedQuery) ||
// // //       book.subject.toLowerCase().includes(lowercasedQuery) ||
// // //       (book.college && book.college.toLowerCase().includes(lowercasedQuery))
// // //     );
// // //     setFilteredBooks(results);
// // //   };

// // //   const findBooksNearMe = () => {
// // //     setIsLocating(true);
// // //     if (!navigator.geolocation) {
// // //       alert("Geolocation is not supported by your browser.");
// // //       setIsLocating(false);
// // //       return;
// // //     }
// // //     navigator.geolocation.getCurrentPosition(
// // //       (position) => {
// // //         const { latitude, longitude } = position.coords;
// // //         const booksWithDistance = books.map(book => {
// // //           if (book.latitude && book.longitude) {
// // //             const distanceInMeters = getDistance(
// // //               { latitude, longitude },
// // //               { latitude: book.latitude, longitude: book.longitude }
// // //             );
// // //             return { ...book, distance: distanceInMeters / 1000 };
// // //           }
// // //           return { ...book, distance: Infinity };
// // //         });
// // //         const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
// // //         setFilteredBooks(sortedBooks);
// // //         setIsLocating(false);
// // //       },
// // //       (error) => {
// // //         console.error("Error getting user location:", error);
// // //         alert("Could not get your location. Please ensure you have enabled location services.");
// // //         setIsLocating(false);
// // //       }
// // //     );
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="text-center mb-10">
// // //         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
// // //         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
// // //           {/* ✅ CHANGE IS HERE: Show a different message based on login status */}
// // //           {user ? "Find affordable textbooks for your courses or give your old books a new life." : "Please log in to browse and share books."}
// // //         </p>
// // //       </div>
      
// // //       {/* ✅ CHANGE IS HERE: This entire block is now wrapped in a conditional check */}
// // //       {/* It will only render if the 'user' object exists (i.e., the user is logged in) */}
// // //       {user && (
// // //         <div className="max-w-4xl mx-auto mb-8">
// // //           <div className="flex flex-col sm:flex-row gap-4 items-center">
// // //             <div className="w-full flex-grow">
// // //               <SearchBar onSearch={handleSearch} />
// // //             </div>
// // //             <button 
// // //               onClick={findBooksNearMe}
// // //               disabled={isLocating}
// // //               className="w-full sm:w-auto flex-shrink-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
// // //             >
// // //               {isLocating ? 'Finding...' : '📍 Find Books Near Me'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
      
// // //       {/* ✅ CHANGE IS HERE: Conditionally render the book list or a login prompt */}
// // //       {user ? (
// // //         <BookList books={filteredBooks} loading={loading} />
// // //       ) : (
// // //         <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
// // //             <p className="text-gray-600 text-lg">You must be logged in to see the available books.</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import React, { useState, useEffect } from 'react';
// // import { supabase } from '../supabase';
// // import SearchBar from '../components/SearchBar';
// // import BookList from '../components/BookList';
// // import { getDistance } from 'geolib';

// // const Home = ({ user }) => {
// //   const [books, setBooks] = useState([]);
// //   const [filteredBooks, setFilteredBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isLocating, setIsLocating] = useState(false);

// //   useEffect(() => {
// //     const fetchBooks = async () => {
// //       if (!user) {
// //         setBooks([]);
// //         setFilteredBooks([]);
// //         setLoading(false);
// //         return;
// //       }
// //       setLoading(true);
// //       const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
// //       if (error) {
// //         console.error("Error fetching books:", error);
// //       } else {
// //         setBooks(data);
// //         setFilteredBooks(data);
// //       }
// //       setLoading(false);
// //     };
// //     fetchBooks();
// //   }, [user]);

// //   const handleSearch = (query) => {
// //     if (!query) {
// //       setFilteredBooks(books);
// //       return;
// //     }
// //     const lowercasedQuery = query.toLowerCase();
// //     const results = books.filter(book =>
// //       book.title.toLowerCase().includes(lowercasedQuery) ||
// //       book.author.toLowerCase().includes(lowercasedQuery) ||
// //       book.subject.toLowerCase().includes(lowercasedQuery) ||
// //       (book.college && book.college.toLowerCase().includes(lowercasedQuery))
// //     );
// //     setFilteredBooks(results);
// //   };

// //   const findBooksNearMe = () => {
// //     setIsLocating(true);
// //     if (!navigator.geolocation) {
// //       alert("Geolocation is not supported by your browser.");
// //       setIsLocating(false);
// //       return;
// //     }
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude } = position.coords;
// //         const booksWithDistance = books.map(book => {
// //           if (book.latitude && book.longitude) {
// //             const distanceInMeters = getDistance({ latitude, longitude }, { latitude: book.latitude, longitude: book.longitude });
// //             return { ...book, distance: distanceInMeters / 1000 };
// //           }
// //           return { ...book, distance: Infinity };
// //         });
// //         const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
// //         setFilteredBooks(sortedBooks);
// //         setIsLocating(false);
// //       },
// //       (error) => {
// //         console.error("Error getting user location:", error);
// //         alert("Could not get your location. Please ensure you have enabled location services.");
// //         setIsLocating(false);
// //       }
// //     );
// //   };

// //   return (
// //     <div>
// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
// //         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
// //           {user ? "Find affordable textbooks or give your old books a new life." : "Please log in to browse and share books."}
// //         </p>
// //       </div>
      
// //       {user && (
// //         // ✅ CHANGE IS HERE: This is the new, improved layout block
// //         <div className="max-w-3xl mx-auto mb-12">
// //             <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
// //                 <div className="w-full flex-grow">
// //                     <SearchBar onSearch={handleSearch} />
// //                 </div>
// //                 <div className="flex items-center gap-4">
// //                     <div className="hidden md:block border-l h-6 border-gray-300"></div>
// //                     <span className="hidden md:block text-gray-500 text-sm">OR</span>
// //                     <div className="hidden md:block border-l h-6 border-gray-300"></div>
// //                 </div>
// //                 <div className="w-full md:w-auto">
// //                     <button 
// //                       onClick={findBooksNearMe}
// //                       disabled={isLocating}
// //                       className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
// //                     >
// //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
// //                       {isLocating ? 'Finding...' : 'Find Near Me'}
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //       )}
      
// //       {user ? (
// //         <BookList books={filteredBooks} loading={loading} />
// //       ) : (
// //         <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
// //             <p className="text-gray-600 text-lg">You must be logged in to see the available books.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabase';
// import SearchBar from '../components/SearchBar';
// import BookList from '../components/BookList';
// import { getDistance } from 'geolib';

// const Home = ({ user }) => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isLocating, setIsLocating] = useState(false);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (!user) {
//         setBooks([]);
//         setFilteredBooks([]);
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
//       if (error) {
//         console.error("Error fetching books:", error);
//       } else {
//         setBooks(data);
//         setFilteredBooks(data);
//       }
//       setLoading(false);
//     };
//     fetchBooks();
//   }, [user]);

//   const handleSearch = (query) => {
//     if (!query) {
//       setFilteredBooks(books);
//       return;
//     }
//     const lowercasedQuery = query.toLowerCase();
//     const results = books.filter(book =>
//       book.title.toLowerCase().includes(lowercasedQuery) ||
//       book.author.toLowerCase().includes(lowercasedQuery) ||
//       book.subject.toLowerCase().includes(lowercasedQuery) ||
//       (book.college && book.college.toLowerCase().includes(lowercasedQuery))
//     );
//     setFilteredBooks(results);
//   };

//   const findBooksNearMe = () => {
//     setIsLocating(true);
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       setIsLocating(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const booksWithDistance = books.map(book => {
//           if (book.latitude && book.longitude) {
//             const distanceInMeters = getDistance({ latitude, longitude }, { latitude: book.latitude, longitude: book.longitude });
//             return { ...book, distance: distanceInMeters / 1000 };
//           }
//           return { ...book, distance: Infinity };
//         });
//         const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
//         setFilteredBooks(sortedBooks);
//         setIsLocating(false);
//       },
//       (error) => {
//         console.error("Error getting user location:", error);
//         alert("Could not get your location. Please ensure you have enabled location services.");
//         setIsLocating(false);
//       }
//     );
//   };

//   return (
//     <div>
//       <div className="text-center mb-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
//         <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
//           {user ? "Find affordable textbooks or give your old books a new life." : "Please log in to browse and share books."}
//         </p>
//       </div>
//       
//       {user && (
//         // ⭐ MODIFIED LAYOUT BLOCK START
//         <div className="max-w-4xl mx-auto mb-12 px-4 sm:px-0">
//             <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
//                 
//                 {/* SearchBar (Input + Search Button) */}
//                 <div className="w-full md:w-auto md:flex-grow">
//                     {/* Assuming SearchBar component renders the input and green button */}
//                     <SearchBar onSearch={handleSearch} />
//                 </div>

//                 {/* 'Find Near Me' Button */}
//                 <button 
//                   onClick={findBooksNearMe}
//                   disabled={isLocating}
//                   // Apply classes to match the look in your image
//                   className="w-full md:w-auto flex-shrink-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
//                   {isLocating ? 'Finding...' : 'Find Books Near Me'}
//                 </button>
//             </div>
//         </div>
//         
//       )}
//       
//       {user ? (
//         <BookList books={filteredBooks} loading={loading} />
//       ) : (
//         <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
//             <p className="text-gray-600 text-lg">You must be logged in to see the available books.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
// src/pages/Home.jsx (Modified)
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { getDistance } from 'geolib';

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) {
        setBooks([]);
        setFilteredBooks([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching books:", error);
      } else {
        setBooks(data);
        setFilteredBooks(data);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [user]);

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

  const findBooksNearMe = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const booksWithDistance = books.map(book => {
          if (book.latitude && book.longitude) {
            const distanceInMeters = getDistance({ latitude, longitude }, { latitude: book.latitude, longitude: book.longitude });
            return { ...book, distance: distanceInMeters / 1000 };
          }
          return { ...book, distance: Infinity };
        });
        const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
        setFilteredBooks(sortedBooks);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert("Could not get your location. Please ensure you have enabled location services.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
          {user ? "Find affordable textbooks or give your old books a new life." : "Please log in to browse and share books."}
        </p>
      </div>
      
      {user && (
        <div className="max-w-4xl mx-auto mb-12 px-4 sm:px-0">
            {/* This flex container sets up the row layout on desktop */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                
                {/* SearchBar: Takes up available space on desktop, full width on mobile */}
                <div className="w-full md:w-auto md:flex-grow">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* 'Find Near Me' Button: Fixed width on desktop, full width on mobile */}
                <button 
                  onClick={findBooksNearMe}
                  disabled={isLocating}
                  className="w-full md:w-auto flex-shrink-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  {isLocating ? 'Finding...' : 'Find Books Near Me'}
                </button>
            </div>
        </div>
      )}
      
      {user ? (
        <BookList books={filteredBooks} loading={loading} />
      ) : (
        <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <p className="text-gray-600 text-lg">You must be logged in to see the available books.</p>
        </div>
      )}
    </div>
  );
};

export default Home;