import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function NearHosp() {
  const mapRef = useRef(null);
  const markersref = useRef({});
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const map = L.map("map").setView([18.5074, 73.8077], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "OSM contributors",
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 13 });

    const onLocationFound = async (e) => {
      const { lat, lng } = e.latlng;
      setUserLocation({ lat, lng });

      const hospitalIcon = L.icon({
        iconUrl: "/hospiMarker.png",
        iconSize: [35, 35],
        iconAnchor: [15, 30],
        popupAnchor: [0, -28],
      });

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

      try {
        const response = await fetch("http://localhost:5000/api/hospital/findHospi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lng }),
        });

        if (!response.ok) throw new Error("Failed to fetch hospitals");

        const data = await response.json();

        const formattedHospitals = data.map(h => ({
          name: h.name,
          lat: h.lat,
          lng: h.lng,
          distance: (h.distance_meters / 1000).toFixed(2), // km
          address: h.address,
          contact: h.contact,
        }));

        setHospitals(formattedHospitals);

        formattedHospitals.forEach(h => {
          const marker = L.marker([h.lat, h.lng], { icon: hospitalIcon })
            .addTo(map)
            .bindPopup(`${h.name}<br/>${h.address}<br/>${h.contact}`);

          markersref.current[h.name] = marker;
        });
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        alert("Could not load hospitals data.");
      }
    };

    map.on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
      map.remove();
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        boxSizing: "border-box",
        marginTop: "2rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
    >
      {/* Map container */}
      <div
        id="map"
        style={{
          width: "60%",
          height: "100vh",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      ></div>

      {/* Sidebar */}
      <div
        style={{
          width: "38%",
          height: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {/* User Location Card */}
        {userLocation && (
          <div
            style={{
              background: "white",
              padding: "15px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              fontSize: "16px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            User Location:
            <br />
            <b>
              {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </b>
          </div>
        )}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search hospitals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "12px 15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        />

        {/* Hospitals Near You List */}
        <div
          style={{
            flexGrow: 1,
            background: "#E6E6FA",
            borderRadius: "12px",
            border: "2px solid #b5b5f0",
            padding: "20px",
            boxShadow: "0 6px 15px rgba(100, 100, 100, 0.3)",
            overflowY: "auto",
          }}
        >
          <h3
            style={{ marginBottom: "15px", color: "#333", fontWeight: "bold" }}
          >
            Hospitals Near You:
          </h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {hospitals
              .filter((h) =>
                h.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((h, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "2px solid #b5b5f0",
                    borderRadius: "0.7rem",
                    cursor: "pointer",
                    background: "white",
                  }}
                  onClick={() => {
                    const marker = markersref.current[h.name];
                    if (marker) {
                      marker.openPopup();
                      mapRef.current.setView(marker.getLatLng(), 16);
                    }
                  }}
                >
                  <b>{h.name}</b>
                  <br />
                  📍 {h.distance} km away
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
