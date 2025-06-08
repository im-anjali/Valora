import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [contact, setContact] = useState('');
    const [loading, setLoading] = useState(false); // Added missing loading state
    const [emergencyContact1, setEmergencyContact1] = useState('');
    const [emergencyContact2, setEmergencyContact2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting
        setError(''); // Clear previous errors

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify({
  username: username.trim(),
  email: email.trim(),
  password,
  contact: contact.trim(),
  emergency_contact1: emergencyContact1.trim(),
  emergency_contact2: emergencyContact2.trim()
})

            });

            const data = await response.json();
            console.log("Fetch response:", data);

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            navigate("/");
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-10">
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

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-800"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setuserName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full pl-3 pr-3 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-black"
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
                                        htmlFor="contact"
                                        className="block text-sm font-medium text-gray-800"
                                    >
                                        Contact Information
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        id="contact"
                                        type="tel"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="Enter Contact Number"
                                        className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                        required
                                    />
                                </div>

                                <label
                                    htmlFor="emergencyContact1"
                                    className="block text-sm font-medium text-gray-800 mt-4"
                                >
                                    Emergency Contact 1
                                </label>
                                <input
                                    id="emergencyContact1"
                                    type="tel"
                                    value={emergencyContact1}
                                    onChange={(e) => setEmergencyContact1(e.target.value)}
                                    placeholder="Enter Emergency Contact 1"
                                    className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                    required
                                />

                                <label
                                    htmlFor="emergencyContact2"
                                    className="block text-sm font-medium text-gray-800 mt-4"
                                >
                                    Emergency Contact 2
                                </label>
                                <input
                                    id="emergencyContact2"
                                    type="tel"
                                    value={emergencyContact2}
                                    onChange={(e) => setEmergencyContact2(e.target.value)}
                                    placeholder="Enter Emergency Contact 2"
                                    className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                />
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-800"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password" // Added missing type
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
                                disabled={loading}
                                className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-gray-800">
                                Already have an account?{" "}
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