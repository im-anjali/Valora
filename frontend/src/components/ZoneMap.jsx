import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import osm from "./osm-providers";
import useGeoLocation from "./useGeoLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

// Custom marker icon
const markericon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [45, 45],
  iconAnchor: [17, 45],
  popupAnchor: [3, -46],
});

export default function ZoneMap() {
  const defaultCenter = { lat: 18.506811, lng: 73.817753 };
  const zoom_level = 14;
  const mapRef = useRef(null);
  const location = useGeoLocation();

  const center =
    location.loaded && !location.error
      ? {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        }
      : defaultCenter;

  const showMyLocation = () => {
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoom_level,
        { animate: true }
      );
    } else {
      alert(location.error?.message || "Location not available.");
    }
  };

  return (
    <>
      <div className="relative mb-8 w-full lg:w-4/5 mx-auto mt-[2rem]">
        {/* Map */}
        <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-md">
          <MapContainer
            center={center}
            zoom={zoom_level}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
            {location.loaded && !location.error && (
              <Marker
                position={[
                  location.coordinates.lat,
                  location.coordinates.lng,
                ]}
                icon={markericon}
              >
                <Popup>You are here!</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* Locate Me Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={showMyLocation}
            className="bg-indigo-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded shadow"
          >
            Locate Me <FontAwesomeIcon icon={faGlobe} className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
}
