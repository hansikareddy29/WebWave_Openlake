// src/components/AddBookForm.jsx
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { ref as dbRef, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddBookForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [college, setCollege] = useState('');
  const [condition, setCondition] = useState('Good');
  const [availability, setAvailability] = useState('lend');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a book.");
      return;
    }
    setLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        const imageRef = storageRef(storage, `book_images/${image.name + Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const booksRef = dbRef(db, 'books');
      await push(booksRef, {
        title,
        author,
        subject,
        college,
        condition,
        availability,
        imageUrl,
        lenderId: user.uid,
        lenderEmail: user.email,
        createdAt: new Date().toISOString()
      });

      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error adding book: ", error);
      alert('Failed to add book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* Form Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject / Course Name</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">College Name</label>
        <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Condition</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          <option>Like New</option>
          <option>Good</option>
          <option>Acceptable</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          <option value="lend">Lend</option>
          <option value="giveaway">Give Away</option>
        </select>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">Book Image (Optional)</label>
        <input type="file" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400">
        {loading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
};

export default AddBookForm;