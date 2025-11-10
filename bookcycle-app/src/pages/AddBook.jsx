// // // src/pages/AddBook.jsx
// // import React, { useState } from 'react';
// // import { db, storage } from '../firebase';
// // import { ref as dbRef, push } from 'firebase/database';
// // import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// // import { useNavigate } from 'react-router-dom';

// // const inputStyle = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors";
// // const labelStyle = "block text-sm font-medium text-gray-700";

// // const AddBook = ({ user }) => {
// //   const [title, setTitle] = useState('');
// //   const [author, setAuthor] = useState('');
// //   const [subject, setSubject] = useState('');
// //   const [college, setCollege] = useState('');
// //   const [condition, setCondition] = useState('Good');
// //   const [availability, setAvailability] = useState('lend');
// //   const [image, setImage] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [aiLoading, setAiLoading] = useState(false);
// //   const navigate = useNavigate();

// //   // --- FEATURE #5: Book Cover Recognition (Functional UI Demo) ---
// //   const handleAiScan = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     setAiLoading(true);
    
// //     // ** THIS IS A SIMULATION **
// //     // In a real app, you would replace this `setTimeout` with a call to a secure Firebase Cloud Function.
// //     // The Cloud Function would use an AI service (like Google Vision API) to analyze the image
// //     // and return the extracted text. You should never expose API keys on the client-side.
// //     console.log("Simulating AI scan... In production, this would call a cloud function.");
    
// //     setTimeout(() => {
// //       // The AI would return data, and you would auto-fill the form
// //       setTitle("Operating System Concepts");
// //       setAuthor("Abraham Silberschatz");
// //       setAiLoading(false);
// //       alert("AI Scan Demo Complete! Title and Author have been auto-filled.");
// //     }, 2000); // Simulate a 2-second API call
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       let imageUrl = '';
// //       if (image) {
// //         const imageRef = storageRef(storage, `book_images/${image.name + Date.now()}`);
// //         await uploadBytes(imageRef, image);
// //         imageUrl = await getDownloadURL(imageRef);
// //       }
// //       const booksRef = dbRef(db, 'books');
// //       await push(booksRef, {
// //         title, author, subject, college, condition, availability, imageUrl, 
// //         lenderId: user.uid, lenderEmail: user.email, createdAt: new Date().toISOString(), isBorrowed: false
// //       });
// //       alert('Book added successfully!');
// //       navigate('/');
// //     } catch (error) {
// //       alert('Failed to add book.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">List a New Book</h1>
// //       <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
// //         <div className="mb-6 border-b pb-6">
// //             <label className={labelStyle}>Scan Book Cover (AI Demo)</label>
// //             <p className="text-xs text-gray-500 mb-2">Upload a picture of the book's cover to auto-fill the title and author.</p>
// //             <input type="file" accept="image/*" onChange={handleAiScan} disabled={aiLoading} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-800 hover:file:bg-indigo-200 cursor-pointer disabled:opacity-50"/>
// //             {aiLoading && <p className="text-sm text-indigo-600 mt-2 animate-pulse">🤖 Scanning cover with AI...</p>}
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className={labelStyle}>Title</label>
// //             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputStyle} />
// //           </div>
// //           <div>
// //             <label className={labelStyle}>Author</label>
// //             <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className={inputStyle} />
// //           </div>
// //           <div>
// //             <label className={labelStyle}>Subject / Course Name</label>
// //             <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className={inputStyle} />
// //           </div>
// //           <div>
// //             <label className={labelStyle}>Your College / City</label>
// //             <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} required placeholder="e.g., Stanford University or Palo Alto" className={inputStyle} />
// //           </div>
// //           {/* FEATURE #7: Input for Book Condition */}
// //           <div>
// //             <label className={labelStyle}>Condition</label>
// //             <select value={condition} onChange={(e) => setCondition(e.target.value)} className={inputStyle}>
// //               <option value="Like New">🟢 Like New</option>
// //               <option value="Good">🟡 Good</option>
// //               <option value="Acceptable">🔴 Acceptable</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className={labelStyle}>Availability</label>
// //             <select value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputStyle}>
// //               <option value="lend">Lend</option>
// //               <option value="giveaway">Give Away</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className={labelStyle}>Book Image</label>
// //             <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 cursor-pointer" />
// //           </div>
// //           <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
// //             {loading ? 'Adding Book...' : 'Add Book to Cycle'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddBook;
// // src/pages/AddBook.jsx
// import React, { useState } from 'react';
// import { db, storage } from '../firebase';
// import { ref as dbRef, push } from 'firebase/database';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useNavigate } from 'react-router-dom';
// import { getFunctions, httpsCallable } from 'firebase/functions';

// const inputStyle = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors";
// const labelStyle = "block text-sm font-medium text-gray-700";

// const AddBook = ({ user }) => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [subject, setSubject] = useState('');
//   const [college, setCollege] = useState('');
//   const [condition, setCondition] = useState('Good');
//   const [availability, setAvailability] = useState('lend');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);
//   const navigate = useNavigate();

//   // Initialize Firebase Functions
//   const functions = getFunctions();
//   const extractBookDetails = httpsCallable(functions, 'extractBookDetailsFromImage');

//   // Convert image file to base64
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         // Remove the data:image/jpeg;base64, prefix
//         const base64String = reader.result.split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // Real AI Scan using Firebase Cloud Function
//   const handleAiScan = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please upload a valid image file');
//       return;
//     }

//     // Validate file size (e.g., max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setAiLoading(true);
    
//     try {
//       // Convert image to base64
//       const base64Image = await convertToBase64(file);
      
//       // Call the Firebase Cloud Function
//       const result = await extractBookDetails({ imageData: base64Image });
      
//       // Auto-fill the form with extracted data
//       if (result.data.title) {
//         setTitle(result.data.title);
//       }
//       if (result.data.author) {
//         setAuthor(result.data.author);
//       }
      
//       alert('✅ Book details extracted successfully! Please verify and add any missing information.');
//     } catch (error) {
//       console.error('AI Scan Error:', error);
      
//       // Handle specific error cases
//       if (error.code === 'unauthenticated') {
//         alert('❌ Please log in to use the AI scan feature.');
//       } else if (error.code === 'invalid-argument') {
//         alert('❌ Invalid image data. Please try another image.');
//       } else {
//         alert('❌ Failed to extract book details. Please fill the form manually or try a clearer image.');
//       }
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let imageUrl = '';
//       if (image) {
//         const imageRef = storageRef(storage, book_images/$`{image.name + Date.now()}`);
//         await uploadBytes(imageRef, image);
//         imageUrl = await getDownloadURL(imageRef);
//       }
//       const booksRef = dbRef(db, 'books');
//       await push(booksRef, {
//         title, author, subject, college, condition, availability, imageUrl, 
//         lenderId: user.uid, lenderEmail: user.email, createdAt: new Date().toISOString(), isBorrowed: false
//       });
//       alert('Book added successfully!');
//       navigate('/');
//     } catch (error) {
//       alert('Failed to add book.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">List a New Book</h1>
//       <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//         <div className="mb-6 border-b pb-6">
//             <label className={labelStyle}>🤖 Scan Book Cover with AI</label>
//             <p className="text-xs text-gray-500 mb-2">Upload a picture of the book's cover to auto-fill the title and author using AI.</p>
//             <input 
//               type="file" 
//               accept="image/*" 
//               onChange={handleAiScan} 
//               disabled={aiLoading} 
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-800 hover:file:bg-indigo-200 cursor-pointer disabled:opacity-50"
//             />
//             {aiLoading && (
//               <div className="flex items-center gap-2 text-sm text-indigo-600 mt-2">
//                 <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Analyzing book cover with AI...</span>
//               </div>
//             )}
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className={labelStyle}>Title</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputStyle} />
//           </div>
//           <div>
//             <label className={labelStyle}>Author</label>
//             <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className={inputStyle} />
//           </div>
//           <div>
//             <label className={labelStyle}>Subject / Course Name</label>
//             <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className={inputStyle} />
//           </div>
//           <div>
//             <label className={labelStyle}>Your College / City</label>
//             <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} required placeholder="e.g., Stanford University or Palo Alto" className={inputStyle} />
//           </div>
//           <div>
//             <label className={labelStyle}>Condition</label>
//             <select value={condition} onChange={(e) => setCondition(e.target.value)} className={inputStyle}>
//               <option value="Like New">🟢 Like New</option>
//               <option value="Good">🟡 Good</option>
//               <option value="Acceptable">🔴 Acceptable</option>
//             </select>
//           </div>
//           <div>
//             <label className={labelStyle}>Availability</label>
//             <select value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputStyle}>
//               <option value="lend">Lend</option>
//               <option value="giveaway">Give Away</option>
//             </select>
//           </div>
//           <div>
//             <label className={labelStyle}>Book Image</label>
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 cursor-pointer" />
//           </div>
//           <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
//             {loading ? 'Adding Book...' : 'Add Book to Cycle'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBook;

// src/pages/AddBook.jsx
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { ref as dbRef, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const inputStyle = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors";
const labelStyle = "block text-sm font-medium text-gray-700";

const AddBook = ({ user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [college, setCollege] = useState('');
  const [condition, setCondition] = useState('Good');
  const [availability, setAvailability] = useState('lend');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = storageRef(storage, book_images/$`{image.name + Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
      const booksRef = dbRef(db, 'books');
      await push(booksRef, {
        title, author, subject, college, condition, availability, imageUrl, 
        lenderId: user.uid, lenderEmail: user.email, createdAt: new Date().toISOString(), isBorrowed: false
      });
      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
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
          <div>
            <label className={labelStyle}>Your College / City</label>
            <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} required placeholder="e.g., Stanford University or Palo Alto" className={inputStyle} />
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