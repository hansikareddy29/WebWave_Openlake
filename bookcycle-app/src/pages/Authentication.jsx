// src/pages/Authentication.jsx
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function Authentication() {
  const [user, setUser] = useState(null);

  // Track the logged-in user in real time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google sign-in
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-80">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Sign in to BookCycle 📚</h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.displayName}</h2>
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <p className="text-gray-700 mb-4">{user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Authentication;
