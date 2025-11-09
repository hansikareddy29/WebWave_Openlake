// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksRef = ref(db, 'books');
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedBooks = [];
      for (const key in data) {
        loadedBooks.push({ id: key, ...data[key] });
      }
      setBooks(loadedBooks.reverse()); // Show newest first
      setFilteredBooks(loadedBooks);
      setLoading(false);
    });
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
      <h1 className="text-3xl font-bold text-center mb-2">Find a Textbook</h1>
      <p className="text-center text-gray-600 mb-8">Browse and borrow books from students near you.</p>
      <SearchBar onSearch={handleSearch} />
      <BookList books={filteredBooks} loading={loading} />
    </div>
  );
};

export default Home;