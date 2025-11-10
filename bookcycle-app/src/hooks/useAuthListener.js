// src/hooks/useAuthListener.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
      setLoading(false);
    });

    return () => listener();
  }, []);

  return { user, loading };
}