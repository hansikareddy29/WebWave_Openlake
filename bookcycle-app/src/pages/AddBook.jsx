// src/pages/AddBook.jsx
import React from 'react';
import AddBookForm from '../components/AddBookForm';

const AddBook = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">List a New Book</h1>
      <AddBookForm user={user} />
    </div>
  );
};

export default AddBook;