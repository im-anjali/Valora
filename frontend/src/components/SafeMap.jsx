import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useRef, useState, useEffect } from "react";
import osm from "./osm-providers";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";


// Custom marker icon
const markericon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [45, 45],
  iconAnchor: [17, 45],
  popupAnchor: [3, -46],
});

// Component to handle routing
const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng),
      ],
      routeWhileDragging: true,
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};


export default function SafeMap() {
  const defaultCenter = { lat: 18.506811, lng: 73.817753 };
  const zoom_level = 13;

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const handleSetRoute = () => {
    const [startLat, startLng] = startInput.split(",").map(Number);
    const [endLat, endLng] = endInput.split(",").map(Number);

    if (
      !isNaN(startLat) &&
      !isNaN(startLng) &&
      !isNaN(endLat) &&
      !isNaN(endLng)
    ) {
      setStart({ lat: startLat, lng: startLng });
      setEnd({ lat: endLat, lng: endLng });
    } else {
      alert("Please enter valid coordinates");
    }
  };

  return (
    <>
      <h2 className="text-center text-xl font-bold mb-4">Know Your City...</h2>
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="text"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
          placeholder="Start (lat,lng)"
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          value={endInput}
          onChange={(e) => setEndInput(e.target.value)}
          placeholder="End (lat,lng)"
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleSetRoute}
          className="bg-indigo-300 text-black px-4 py-1 rounded hover:blue-500"
        >
          Show Route
        </button>
      </div>

      <div className="h-[600px] w-full mb-20 lg:w-6/7 mx-auto relative z-0 rounded-2xl overflow-hidden shadow-md">
        <MapContainer
          center={defaultCenter}
          zoom={zoom_level}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          {start && <Marker position={start} icon={markericon} />}
          {end && <Marker position={end} icon={markericon} />}
          {start && end && <Routing start={start} end={end} />}
        </MapContainer>
      </div>
    </>
  );
}
