import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

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
      let response;
      if (isSignUp) {
        response = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: email.split('@')[0] 
            }
          }
        });
      } else {
        response = await supabase.auth.signInWithPassword({ email, password });
      }
      if (response.error) throw response.error;
      
      if (response.data.user) {
        navigate('/');
      } else if (isSignUp) {
        alert("Sign up successful! Please check your email to verify your account.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">{isSignUp ? 'Create an Account' : 'Welcome Back!'}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{isSignUp ? 'And join the BookCycle community' : 'Sign in to continue'}</p>
        </div>
        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mt-6 text-center">{error}</p>}
        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Email address" required /></div>
            <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Password" required /></div>
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <div className="mt-6">
          <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div></div>
          <div className="mt-6">
            <button onClick={handleGoogleSignIn} className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
              Sign In with Google
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-8">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-medium text-green-600 hover:text-green-500 ml-1">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
        </p>
      </div>
    </div>
  );
};

export default Login;