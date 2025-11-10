import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { getDistance } from 'geolib';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
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

  // This function gets the user's location and sorts books by distance
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
            const distanceInMeters = getDistance(
              { latitude, longitude },
              { latitude: book.latitude, longitude: book.longitude }
            );
            return { ...book, distance: distanceInMeters / 1000 }; // Convert to km
          }
          return { ...book, distance: Infinity }; // Put books without a location at the end
        });

        // Sort the books array by the new 'distance' property
        const sortedBooks = booksWithDistance.sort((a, b) => a.distance - b.distance);
        
        setFilteredBooks(sortedBooks);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert("Could not get your location. Please ensure you have enabled location services in your browser settings.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Share & Discover Textbooks</h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
          Find affordable textbooks for your courses or give your old books a new life.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <div className="flex-grow max-w-2xl">
            <SearchBar onSearch={handleSearch} />
        </div>
        <button 
          onClick={findBooksNearMe}
          disabled={isLocating}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLocating ? 'Finding...' : '📍 Find Books Near Me'}
        </button>
      </div>
      <BookList books={filteredBooks} loading={loading} />
    </div>
  );
};

export default Home;