import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const inputStyle = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors";
const labelStyle = "block text-sm font-medium text-gray-700";

const AddBook = ({ user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [college, setCollege] = useState(''); 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [condition, setCondition] = useState('Good');
  const [availability, setAvailability] = useState('lend');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  const handleLocationBlur = async (e) => {
    const locationQuery = e.target.value;
    if (locationQuery.trim() === '') {
      setLatitude(null);
      setLongitude(null);
      return;
    }

    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationQuery)}&key=${OPENCAGE_API_KEY}&limit=1`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
      } else {
        alert("Could not find coordinates for this location. Please be more specific.");
        setLatitude(null);
        setLongitude(null);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("There was an error finding this location.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { alert("You must be logged in."); return; }
    if (!latitude || !longitude) {
      alert("Please enter a valid location that can be found on the map before submitting.");
      return;
    }
    setLoading(true);

    try {
      let bookImageUrl = '';
      if (image) {
        
        const filePath = `public/${user.id}/${Date.now()}-${image.name}`;
        
        const { error: uploadError } = await supabase.storage.from('book-images').upload(filePath, image);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('book-images').getPublicUrl(filePath);
        bookImageUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase.from('books').insert({
        title, author, subject, college, condition, availability,
        image_url: bookImageUrl,
        is_borrowed: false,
        lender_id: user.id,
        lender_email: user.email,
        latitude: latitude,
        longitude: longitude,
      });
      if (dbError) throw dbError;

      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error adding book:", error);
      alert('Failed to add book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">List a New Book</h1>
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
          
          {/* LOCATION FIELD */}
          <div>
            <label className={labelStyle}>Your College / City / Zip Code</label>
            <input 
              type="text" 
              value={college} 
              onChange={(e) => setCollege(e.target.value)} 
              onBlur={handleLocationBlur}
              required 
              placeholder="e.g., Stanford University or 94305" 
              className={inputStyle} 
            />
            {latitude && <p className="text-xs text-green-600 mt-1">✓ Location found!</p>}
          </div>

          <div>
            <label className={labelStyle}>Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className={inputStyle}>
              <option value="Like New">🟢 Like New</option>
              <option value="Good">🟡 Good</option>
              <option value="Acceptable">🔴 Acceptable</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputStyle}>
              <option value="lend">Lend</option>
              <option value="giveaway">Give Away</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Book Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 cursor-pointer" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Adding Book...' : 'Add Book to Cycle'}
          </button>
        </form>
      </div>
        </div>
  );
};

export default AddBook;