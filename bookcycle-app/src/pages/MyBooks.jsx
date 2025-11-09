// src/pages/MyBooks.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import BookList from '../components/BookList';

const MyBooks = ({ user }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const booksRef = ref(db, 'books');
      const userBooksQuery = query(booksRef, orderByChild('lenderId'), equalTo(user.uid));

      onValue(userBooksQuery, (snapshot) => {
        const data = snapshot.val();
        const loadedBooks = [];
        for (const key in data) {
          loadedBooks.push({ id: key, ...data[key] });
        }
        setMyBooks(loadedBooks.reverse());
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">My Listed Books</h1>
      <BookList books={myBooks} loading={loading} />
    </div>
  );
};

export default MyBooks;