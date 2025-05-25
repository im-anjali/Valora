import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext"
import {AuthContext} from "../context/UserContext";
import axios from "axios"
import { useContext } from "react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {currUser, update} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{email, password}, {withCredentials:true});
            const token = res.data.token;
            if(token){
                   localStorage.setItem("token", token);
            }else{
                console.log("no token found");
            }
            const user = {
                ...res.data.user,
                token:res.data.token,

            }

            update(user);
            console.log(user);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }





    return (
        <>
        
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
                            Sign in
                        </h3>
                    </div>
                    <form className="space-y-6"onSubmit={handleSubmit}>
                        <div className="space-y-2">
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
                                    className="w-full pl-3 pr-3 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
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
                                    className="w-full pl-3 pr-10 py-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-black"
                                    required
                                />
                               
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
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-black hover:text-gray-600 font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>






        </div>
        </>
    );
};

export default Login;