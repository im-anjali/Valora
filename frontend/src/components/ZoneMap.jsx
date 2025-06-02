import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function ZoneMap() {
  const mapRef = useRef(null); // Div reference
  const leafletMap = useRef(null); // Map instance reference
  const markerRef = useRef(null); // Store user location marker
  const zoneLayerRef = useRef(null); // Store current zone polygon layer

  useEffect(() => {
    if (!leafletMap.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([18.5074, 73.8077], 13);

      L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Event handler for successful location
      map.on("locationfound", async (e) => {
        const radius = e.accuracy;

        // Remove old user location marker if any
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Remove old zone polygon if any
        if (zoneLayerRef.current) {
          map.removeLayer(zoneLayerRef.current);
        }

        const marker = L.marker(e.latlng).addTo(map);
        marker.bindPopup(`You are within ${Math.round(radius)} meters.`).openPopup();

       

        markerRef.current = marker;
        map.setView(e.latlng, 15);

        // *** Log the coordinates here ***
        console.log("Sending coordinates to backend:", {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });

        // 👉 Call backend to get zone by lat/lng
        try {
          const response = await fetch("http://localhost:5000/api/zones/find-zone", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: e.latlng.lat,
              lng: e.latlng.lng,
            }),
          });
          if (!response.ok) throw new Error("Zone not found");

          const zone = await response.json();

          // zone.polygon should be a GeoJSON string, parse it
          const geojson = zone.boundary; // ✅ NO NEED to parse if backend already returns JSON

          // Draw the zone polygon with its color
          const zoneLayer = L.geoJSON(geojson, {
            style: {
              color: zone.color || "blue",
              weight: 2,
              fillOpacity: 0.4,
            },
          })
            .addTo(map)
            .bindPopup(`You are in Zone: ${zone.zone} (${zone.color})`)
            .openPopup();

          zoneLayerRef.current = zoneLayer;
        } catch (err) {
          console.error("Zone fetch error:", err);
          alert("Your location is not inside any defined zone.");
        }
      });

      // Handle location errors
      map.on("locationerror", (e) => {
        alert("Location access denied or unavailable.");
      });

      leafletMap.current = map;
    }

    // Clean up map on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Function to locate user on button click
  const locateUser = () => {
    if (leafletMap.current) {
      leafletMap.current.locate({ setView: false, maxZoom: 16 });
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        id="map"
        ref={mapRef}
        style={{
          width: "80%",
          height: "80vh",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "12px",
        }}
      ></div>
      <button
        onClick={locateUser}
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          padding: "12px 20px",
          backgroundColor: "#c0c0e0",
          color: "black",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        📍 Locate Me
      </button>
    </div>
  );
}
