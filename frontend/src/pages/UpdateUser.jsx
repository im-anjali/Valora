import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ArrowUpZaIcon, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/UserContext';
import { useContext } from 'react';
function UpdateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();
  const { currUser, update } = useContext(AuthContext);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("no token found");
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getdetails`, {

          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
        );
        const user = res.data.details;
        setUsername(user.username);
        setEmail(user.email);
        setContact(user.contact);
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetails();
  }, [])
  const handleupdate = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("no token found");
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/updateuser`,
        { username, email, contact },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      update(res.data.updateProfile)
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-semibold text-purple-700 text-center mb-6">Edit Your Profile</h2>
        <form className="space-y-5" onSubmit={handleupdate}>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={(e) => { setContact(e.target.value) }}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"

            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
