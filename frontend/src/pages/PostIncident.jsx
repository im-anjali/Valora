import React, { useEffect, useState } from "react";
import axios from "axios";

function PostIncident() {
  const [incidents, setIncidents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // for modal

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/post/getincident`);
        setIncidents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10 relative">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Reported Incidents</h1>

      <div className="flex flex-col gap-6">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5"
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-2">{incident.title}</h3>
            <p className="text-gray-700 mb-4">{incident.description}</p>
            {incident.media && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${incident.media}`}
                alt="incident"
                className="w-full max-h-[150px] max-w-[150px] object-cover rounded-xl cursor-pointer hover:opacity-80"
                onClick={() =>
                  setSelectedImage(`${import.meta.env.VITE_BACKEND_URL}/uploads/${incident.media}`)
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-4 max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()} // prevent modal close on image click
          >
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-10 text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostIncident;
