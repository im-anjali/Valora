import React, { useEffect, useState } from "react";
import axios from "axios";

function PostIncident() {
  const [incidents, setIncidents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // for modal
  const [PostIncident , setPostIncident] = useState(null)
   const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription ] = useState("");
  const [media, setMedia] = useState("")
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if(!token){
        console.warn("no token found");
        return;
      }
      try {
        const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/post/getincident`, 
          {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
        );
        setIncidents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);
  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found");
    return;
  }

  try {
   const formData = new FormData();
   formData.append("title", title);
   formData.append("description", description);
   if(media){
    formData.append("media", media)
   }
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/post/postincident`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          
        },
      }
    );

    setIsOpen(false);
    setTitle("");
    setDescription("");
    setMedia(null);
    window.location.reload(); 
  } catch (error) {
    console.error("POST error:", error.response?.data || error.message);
  }
};


  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10 relative">
      <div className="flex justify-between items-center w-full mb-8">
  <div className="flex-1 text-center">
    <h1 className="text-3xl font-bold text-purple-700">Reported Incidents</h1>
  </div>
  <div className="flex-none">
    <button  onClick={() => setIsOpen(true)} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer">
     
      Post an Incident
    </button>
  </div>
</div>
  {isOpen && (
  <div
    className="fixed inset-0  bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50"
    onClick={() => setIsOpen(false)}
  >
    <div
      className="bg-purple-100 p-7 rounded-2xl shadow-lg w-[90%] max-w-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <form className="space-y-4">
        <h1 className="text-center text-xl text-purple-800">Post an Incident</h1>

        <input
          type="text"
          id="title"
          placeholder="Enter title"
          className="border p-3 w-full bg-white rounded"
          onChange={(e) =>{setTitle(e.target.value)}}
        />
        <textarea
          id="description"
          placeholder="Enter Description"
          className="border rounded w-full p-3 bg-white h-40 resize-none"
          onChange={(e) => {setDescription(e.target.value)}}
        ></textarea>
        <input
          type="file"
            onChange={(e) => setMedia(e.target.files[0])}
          className="file:bg-purple-600 p-3 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer hover:file:bg-purple-700 w-full bg-white rounded"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


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
