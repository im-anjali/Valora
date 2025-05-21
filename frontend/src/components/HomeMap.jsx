import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 18.507982, lng: 73.816941 };

export default function HomeMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_APIKEY, 
  });

  if (!isLoaded) {
    return <p>The map is loading...</p>;
  }

  return (
    <div className="w-screen h-[600px] border border-black rounded-md">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
