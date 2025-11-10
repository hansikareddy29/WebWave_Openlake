// // import React, { useState, useEffect } from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import { auth } from './firebase';
// // import { onAuthStateChanged } from 'firebase/auth';

// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import AddBook from './pages/AddBook';
// // import MyBooks from './pages/MyBooks';
// // import Login from './pages/Login';
// // import Chat from './pages/Chat';  // ✅ NEW IMPORT

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Listen for authentication state changes
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       console.log("Auth state changed, user is:", currentUser?.email || "logged out");
// //       setUser(currentUser);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen font-bold text-xl">
// //         Loading BookCycle...
// //       </div>
// //     );
// //   }

// //   const ProtectedRoute = ({ children }) => {
// //     if (!user) return <Navigate to="/login" />;
// //     return children;
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-50">
// //       <Navbar user={user} />
      
// //       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <Routes>
// //           <Route path="/" element={<Home user={user} />} />

// //           <Route path="/login" element={<Login />} />

// //           <Route 
// //             path="/add-book" 
// //             element={
// //               <ProtectedRoute>
// //                 <AddBook user={user} />
// //               </ProtectedRoute>
// //             } 
// //           />

// //           <Route 
// //             path="/my-books" 
// //             element={
// //               <ProtectedRoute>
// //                 <MyBooks user={user} />
// //               </ProtectedRoute>
// //             } 
// //           />

// //          <Route 
// //             path="/chat/:chatId" 
// //             element={
// //               <ProtectedRoute>
// //                 <Chat user={user} />
// //               </ProtectedRoute>
// //             } 
// //           />
// //         </Routes>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { supabase } from './supabase'; // <-- IMPORT SUPABASE

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import AddBook from './pages/AddBook';
// import MyBooks from './pages/MyBooks';
// import Login from './pages/Login';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for an active session when the app loads
//     supabase.auth.getSession().then(({ data: { session } }) => {
//         setUser(session?.user ?? null);
//         setLoading(false);
//     });

//     // Listen for changes in authentication state (login, logout)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen font-bold text-xl">Loading BookCycle...</div>;
//   }

//   // A protected route component to guard pages
//   const ProtectedRoute = ({ children }) => {
//     if (!user) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar user={user} />
//       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route 
//             path="/add-book" 
//             element={ <ProtectedRoute> <AddBook user={user} /> </ProtectedRoute> } 
//           />
//           <Route 
//             path="/my-books" 
//             element={ <ProtectedRoute> <MyBooks user={user} /> </ProtectedRoute> } 
//           />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
// This is the complete and final version of App.js for your project.
// It includes all routes for Home, Login, Dashboard, Requests, Chat, etc.
// and uses Supabase for authentication.

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

// --- Layout Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Page Components ---
import Home from './pages/Home';
import Login from './pages/Login';
import AddBook from './pages/AddBook';
import MyBooks from './pages/MyBooks';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'; // If you still use this as a dedicated login page

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This effect hook sets up the Supabase authentication listener.
  // It runs once when the app loads and keeps the user state in sync.
  useEffect(() => {
    // Check for an active session when the app first loads
    supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
    });

    // Listen for changes in authentication state (e.g., user logs in or out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup the listener when the component is unmounted
    return () => subscription.unsubscribe();
  }, []);

  // Show a loading screen while the user session is being determined
  if (loading) {
    return <div className="flex justify-center items-center h-screen font-bold text-xl">Loading BookCycle...</div>;
  }

  // This is a wrapper component to protect routes that require a logged-in user.
  // If the user is not logged in, it redirects them to the login page.
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Authentication />} /> {/* Route for your dedicated auth page */}
          <Route path="/book/:bookId" element={<BookDetails user={user} />} />

          {/* --- Protected Routes (Require Login) --- */}
          <Route 
            path="/add-book" 
            element={ <ProtectedRoute> <AddBook user={user} /> </ProtectedRoute> } 
          />
          <Route 
            path="/my-books" 
            element={ <ProtectedRoute> <MyBooks user={user} /> </ProtectedRoute> } 
          />
          <Route 
            path="/dashboard" 
            element={ <ProtectedRoute> <Dashboard user={user} /> </ProtectedRoute> } 
          />
          <Route 
            path="/requests" 
            element={ <ProtectedRoute> <Requests user={user} /> </ProtectedRoute> } 
          />
          <Route 
            path="/chat/:chatId" 
            element={ <ProtectedRoute> <Chat user={user} /> </ProtectedRoute> } 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;