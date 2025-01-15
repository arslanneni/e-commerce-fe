// src/pages/Signup.js

import React, { useState } from 'react';
import { toast } from 'react-toastify';


const SignupComponent = () => {

    // const history = useHistory();

    const initialState = {
        FULL_NAME: "",
        USERNAME: "",
        EMAIL: "",
        PHONENUMBER: "",
        ADDRESS: "",
        PASSWORD: ""
    };

    const [fields, setFields] = useState(initialState);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        const payload = {
            username: fields.USERNAME,
            email: fields.EMAIL,
            password: fields.PASSWORD,
            phonenumber: fields.PHONENUMBER,
            address: fields.ADDRESS,
            user_id:fields.USERNAME
        };

        try {
            setLoading(true);
            setError(""); 

            const response = await fetch('http://localhost:5000/auth/signupUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.status==='SUCCESS') {
                 toast.success("Sign Up Successful!");
                 setFields(initialState);
                 setTimeout(() => {
                    window.location.href = '/login'; 
                  }, 2000);
            } else {
                 toast.error(data.message)
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFields({
            ...fields,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-stretch gap-6">
            <div className="w-full md:w-1/2">
                <img
                    src={'/img/signup-image.jpeg'}
                    alt="Signup"
                    className="w-full h-full object-cover rounded-lg shadow-md"
                />
            </div>

            <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Create an Account</h2>
                {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-2">
                        <label htmlFor="FULL_NAME" className="block text-gray-700 text-xs mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="FULL_NAME"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="John Doe"
                            value={fields.FULL_NAME}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="USERNAME" className="block text-gray-700 text-xs mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="USERNAME"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="john_doe123"
                            value={fields.USERNAME}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="EMAIL" className="block text-gray-700 text-xs mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="EMAIL"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="example@example.com"
                            value={fields.EMAIL}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="PHONENUMBER" className="block text-gray-700 text-xs mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="PHONENUMBER"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="+123 456 7890"
                            value={fields.PHONENUMBER}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="ADDRESS" className="block text-gray-700 text-xs mb-1">
                            Address
                        </label>
                        <textarea
                            id="ADDRESS"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="1234 Main St, City, State, ZIP"
                            rows="1"
                            value={fields.ADDRESS}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="PASSWORD" className="block text-gray-700 text-xs mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="PASSWORD"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200 text-xs"
                            placeholder="********"
                            value={fields.PASSWORD}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition text-sm"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-2 text-xs">
                    Already have an account?{' '}
                    <a href="/login" className="text-gray-800 font-medium">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupComponent;
