// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
          await signInWithPopup(auth, provider);
          navigate('/');
      } catch (err) {
          setError(err.message);
      }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
        <p className="text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-green-600 ml-1 hover:underline">
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;