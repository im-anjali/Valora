import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export default function Sos() {
  const [emerContactsMessage, setEmerContactsMessage] = useState(
    "Locating you and notifying your contacts..."
  );
  const [locationError, setLocationError] = useState(null);
  const mapRef = useRef(null);
  const userLocationRef = useRef(null);
  const policeMarkerRef = useRef(null);
  const routingControlRef = useRef(null);

  const contacts = [
    { name: "Noopur Karkare", phone: 9763718189 },
    { name: "Sejal Pathak", phone: 9822850039 },
    { name: "Anjali Phule", phone: 7558366814 },
  ];

  const [policeStation, setPoliceStation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setEmerContactsMessage("");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        userLocationRef.current = loc;

        const dummyPolice = {
          lat: loc.lat + 0.005,
          lng: loc.lng + 0.005,
          name: "Nearest Police Station",
          phone: "100",
        };

        setPoliceStation(dummyPolice);
        setEmerContactsMessage(
          "Notification sent to your contacts and nearest police station"
        );
        setLocationError(null);

        if (mapRef.current) {
          mapRef.current.remove();
          policeMarkerRef.current = null;
          routingControlRef.current = null;
        }

        const map = L.map("map").setView([loc.lat, loc.lng], 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        // User marker
        L.marker([loc.lat, loc.lng])
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();

        // Add police marker and route once station is defined
        if (dummyPolice) {
          policeMarkerRef.current = L.marker([dummyPolice.lat, dummyPolice.lng])
            .addTo(map)
            .bindPopup(`${dummyPolice.name} notified with your location`);

          // Routing from user to police station
          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(loc.lat, loc.lng),
              L.latLng(dummyPolice.lat, dummyPolice.lng),
            ],
            routeWhileDragging: false,
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: () => null,
          }).addTo(map);
        }
      },
      () => {
        setLocationError("Unable to retrieve your location");
        setEmerContactsMessage("");
      }
    );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <div
        style={{
          flexBasis: "40%",
          background: "#E6E6FA",
          borderRadius: "12px",
          border: "2px solid #b5b5f0",
          padding: "2rem",
          boxShadow: "0 6px 15px rgba(100, 100, 100, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            minHeight: "3rem",
            textAlign: "center",
          }}
        >
          {emerContactsMessage || "Locating you..."}
        </h3>

        {locationError && (
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            {locationError}
          </p>
        )}

        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            margin: 0,
            width: "100%",
          }}
        >
          {contacts.map((person, i) => (
            <li
              key={i}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "2px solid #b5b5f0",
                borderRadius: "0.7rem",
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>{person.name}</h4>
                <p style={{ margin: 0 }}>{person.phone}</p>
              </div>
            </li>
          ))}

          {policeStation && (
            <li
              key="police-station"
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "2px solid #f08080",
                borderRadius: "0.7rem",
                background: "#ffe6e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>{policeStation.name}</h4>
                <p style={{ margin: 0 }}>{policeStation.phone}</p>
                <p
                  style={{
                    margin: 0,
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "#a00",
                  }}
                >
                  Nearest police station notified with your location
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div
        id="map"
        style={{
          flexBasis: "60%",
          height: "100vh",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        {!userLocationRef.current && (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#777",
              fontSize: "1.2rem",
              fontStyle: "italic",
            }}
          >
            Locating you on the map...
          </div>
        )}
      </div>
    </div>
  );
}
