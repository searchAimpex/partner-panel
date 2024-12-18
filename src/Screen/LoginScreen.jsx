import React, { useEffect, useState } from 'react';
import women from '../assets/wamen.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isSuccess, error, isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    
    if(isSuccess){
      toast.success("Login success!")
      navigate('/redirect');

    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
    } catch (err) {
       console.log("fix")
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side: Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          {error && <div className="text-red-500 mt-4">{error.data?.message}</div>}
        </div>

        {/* Right Side: Image inside a transparent box */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-white/70 flex items-end justify-end p-2 rounded-lg shadow-lg">
            <img src={women} alt="woman" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
