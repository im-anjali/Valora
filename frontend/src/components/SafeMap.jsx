import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export default function SafeMap() {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const userLocationRef = useRef(null);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const map = L.map("map").setView([18.5074, 73.8077], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", function (e) {
      L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
      userLocationRef.current = e.latlng;
    });

    map.on("locationerror", function () {
      alert("Unable to access your location.");
    });

    return () => {
      map.remove();
    };
  }, []);

  // Function to get coordinates from text and route
  const handleDestinationSearch = async () => {
    if (!destination) return alert("Please enter a destination");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
      );
      const results = await response.json();

      if (results.length === 0) {
        alert("Location not found");
        return;
      }

      const destCoords = {
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon),
      };

      // Clear previous route if any
      if (routingControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }

      if (userLocationRef.current && mapRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(userLocationRef.current.lat, userLocationRef.current.lng),
            L.latLng(destCoords.lat, destCoords.lng),
          ],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
        }).addTo(mapRef.current);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to find destination");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ padding: "10px", zIndex: 1000 }}>
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "300px",
          }}
        />
        <button
          onClick={handleDestinationSearch}
          style={{
            padding: "10px 16px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
         Route Me
        </button>
      </div>
      <div
        id="map"
        style={{
          width: "80%",
          height: "80vh",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "12px",
        }}
      ></div>
    </div>
  );
}
