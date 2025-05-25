import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import osm from "./osm-providers"; 
import { Popup } from "react-leaflet";

 //marker icon
  const markericon = new L.Icon({
    iconUrl: "/marker.png",
    iconSize:[45,45],
    iconAnchor: [17,45],
    popupAnchor:[3,-46]
  });

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
    <Marker position={center} icon={markericon}><Popup>
      <b>Marker function works!</b>
      </Popup></Marker>
 </MapContainer>
</div>

    </>
  );
}
