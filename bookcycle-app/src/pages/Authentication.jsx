import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for an active session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/'); // On successful login, redirect to the homepage
      }
    });

    // Cleanup the subscription on unmount
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
      // Supabase handles the redirect, so no navigation here
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null); // Explicitly clear user state
    } catch (error)      {
      console.error("Logout Error:", error);
    }
  };

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
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.user_metadata?.full_name || user.email}</h2>
            <img
              src={user.user_metadata?.avatar_url}
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