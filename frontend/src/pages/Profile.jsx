import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Mail, Phone, MapPin, Calendar
} from 'lucide-react';
import { AuthContext } from '../context/UserContext';

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { currUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getdetails`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setUser(res.data.details);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const avatarLetter = user.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <style>{`
        @keyframes scaleUp10s {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          style={{
            animation: loaded ? 'scaleUp10s 1s forwards ease-in-out' : 'none',
          }}
          className="w-11/12 sm:w-3/4 md:w-2/4 bg-white rounded-2xl shadow-xl overflow-hidden"
        >

          <div className="h-[30%] bg-purple-300 flex items-center space-x-6 px-8 py-6">
            <div
              className="flex items-center justify-center w-28 h-28 rounded-full bg-white text-purple-500 font-bold text-6xl border-2 border-purple-900
                shadow-[0_0_20px_rgba(128,0,128,0.4)]
                transition-shadow duration-300 ease-in-out
                cursor-default"
            >
              {avatarLetter}
            </div>
            <div>
              <h1 className="text-black text-3xl font-semibold transition-colors duration-300 ease-in-out hover:text-purple-700 cursor-default">
                {user.username}
              </h1>
              <p className="text-gray-700 mt-1">Profile Overview</p>
            </div>
          </div>

          <div className="px-8 py-8 space-y-6">
            <h2
              className={`text-2xl font-semibold text-center
                transition-opacity duration-500 ease-in-out
                ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 transition-colors duration-300 ease-in-out hover:text-purple-600 cursor-default">
                <Mail className="text-purple-500" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-black text-lg font-medium">{user.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 transition-colors duration-300 ease-in-out hover:text-purple-600 cursor-default">
                <Phone className="text-purple-500" />
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-black text-lg font-medium">{user.contact || "N/A"}</p>
                </div>
              </div>

              {user.address && (
                <div className="flex items-center gap-4 transition-colors duration-300 ease-in-out hover:text-purple-600 cursor-default">
                  <MapPin className="text-purple-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <p className="text-black text-lg font-medium">{user.address}</p>
                  </div>
                </div>
              )}

              {/* Joined Date (Optional) */}
              <div className="flex items-center gap-4 transition-colors duration-300 ease-in-out hover:text-purple-600 cursor-default">
                <Calendar className="text-purple-500" />
                <div>
                  <p className="text-gray-500 text-sm">Joined</p>
                  <p className="text-black text-lg font-medium">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
