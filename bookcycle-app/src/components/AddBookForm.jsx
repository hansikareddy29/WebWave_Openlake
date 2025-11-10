import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; 

const inputStyle = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors";
const labelStyle = "block text-sm font-medium text-gray-700";

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
      let bookImageUrl = '';
      if (image) {
        const filePath = `public/${user.id}/${Date.now()}-${image.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('book-images') // This is the bucket name you created
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('book-images').getPublicUrl(filePath);
        bookImageUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase.from('books').insert({
        title,
        author,
        subject,
        college,
        condition,
        availability,
        image_url: bookImageUrl, // Supabase columns are often snake_case
        lender_id: user.id,
        lender_email: user.email,
      });

      if (dbError) throw dbError;

      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error adding book: ", error);
      alert('Failed to add book. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelStyle}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Subject / Course Name</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>College Name</label>
          <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="Optional" className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} className={inputStyle}>
            <option>Like New</option>
            <option>Good</option>
            <option>Acceptable</option>
          </select>
        </div>
        <div>
          <label className={labelStyle}>Availability</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputStyle}>
            
            <option value="giveaway">Give Away</option>
          </select>
        </div>
         <div>
          <label className={labelStyle}>Book Image</label>
          <input type="file" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 cursor-pointer" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Adding Book...' : 'Add Book to Cycle'}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;