import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const LoginComponent = () => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: fields.email,
      password: fields.password,
    };

    try {
      setLoading(true);
      setError(''); // Reset any previous errors

      const response = await fetch('http://localhost:5000/auth/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        console.log(data,'data');
        toast.success('Login Successful!');
        Cookies.set('authToken', data.data.token, { expires: 7, secure: true });
        Cookies.set('Roles', data.data.user.role_id === 1?"Admin" : "User" , { expires: 7, secure: true });
        Cookies.set('ID', data.data.user.id , { expires: 7, secure: true });

        setTimeout(() => {
          window.location.href = '/'; 
        }, 2000);
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-stretch gap-6">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 h-full">
        <img
          src={'/img/login-image.jpeg'} // Replace with your actual image
          alt="Login"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Log In to Your Account</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-sm"
              placeholder="example@example.com"
              value={fields.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-sm"
              placeholder="********"
              value={fields.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-700 transition text-sm"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-gray-800 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
