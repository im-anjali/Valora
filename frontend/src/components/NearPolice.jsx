import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function NearPolice() {
  const mapRef = useRef(null);
  const markersref = useRef({});
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", async (e) => {
      const { lat, lng } = e.latlng;
      console.log("User location found:", lat, lng);

      setUserLocation(e.latlng);

      if (map && e.latlng) {
        map.setView(e.latlng, 13);
      }

      try {
        const res = await fetch("http://localhost:5000/police-stations/find-station", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lng }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Nearby stations:", data);
        setStations(data);

        data.forEach((station) => {
          const key = `${station.name}-${station.id}`;
          if (!markersref.current[key]) {
            const marker = L.marker([station.latitude, station.longitude])
              .addTo(map)
              .bindPopup(`<b>${station.name}</b><br>${station.address}`);
            markersref.current[key] = marker;
          }
        });
      } catch (error) {
        console.error("Failed to fetch police stations:", error);
      }
    });
  }, []);

  return (
    <div>
      <h2>Nearby Police Stations</h2>
      <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }} />
      <ul>
        {stations.map((station) => (
          <li key={station.id}>{station.name} - {station.address}</li>
        ))}
      </ul>
    </div>
  );
}
