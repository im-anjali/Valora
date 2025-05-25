import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Signup = () => {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
        const [error, setError] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            console.log(username, email, password)
const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
  username, email, password, contact
});
navigate("/")
        } catch (error) {
            setError(error.response.data.message);
        }
    }





    return (
        <div className="flex h-screen">

            <div className="hidden lg:flex lg:w-1/2  flex-col justify-center items-center p-10">
                <div className="max-w-md text-center">
                   
                    <div className="flex justify-center mb-8">
                        <img src="/public/login.png" alt="login" className="" />
                    </div>
                   
                </div>
            </div>


            <div className="w-full lg:w-1/2 flex justify-center items-center p-10 bg-purple-200">

                <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-black mb-3">
                            Sign Up
                        </h3>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-800"
                            >
                                Full Name
                            </label>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setuserName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full pl-3 pr-3 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-puple-900 focus:border-black"
                                    required
                                />
                            </div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-800"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-3 pr-3 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Contact Information
                                </label>

                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                </div>
                                <input
                                    id="contact"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="Enter Contact Number"
                                    className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                    required
                                />
                              
                            </div>
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Password
                                </label>

                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                </div>
                                <input
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                    required
                                />
                              
                            </div>
                        </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300"
                            >
                                Sign In
                            </button>
                        </div>


                        <div className="text-center mt-6">
                            <p className="text-gray-800">
                                Already have an account? {" "}
                                <Link
                                    to="/login"
                                    className="text-black hover:text-gray-600 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>






        </div>
    );
};

export default Signup;