import { MapContainer, TileLayer } from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css"; // ensure this is imported

import osm from "./osm-providers"; 

export default function HomeMap() {
  const [center] = useState({ lat: 18.506811, lng: 73.817753 });
  const zoom_level = 40;
  const mapRef = useRef();

  return (
    <>
      <h2 className="text-center text-xl font-bold mb-4">Know Your City...</h2>
      <div className="h-[600px] w-full  mb-20 lg:w-6/7 mx-auto relative z-0 rounded-2xl overflow-hidden shadow-md">
    <MapContainer
    center={center}
    zoom={zoom_level}
    ref={mapRef}
    className="h-full w-full"
    scrollWheelZoom={true}
  >
    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
  </MapContainer>
</div>

    </>
  );
}
