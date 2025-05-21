import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical, faBuildingShield, faFireExtinguisher } from "@fortawesome/free-solid-svg-icons";
import KeyCard from "../components/KeyCard";
import HomeMap from "../components/HomeMap";

export default function Home() {
  const services = [
    { name: "Safety check-ins", img: "/checkin.svg", path: "/checkins" },
    { name: "Find Safe Routes", img: "/saferoute.svg", path: "/saferoute" },
    { name: "Post an Incident", img: "/posts.svg", path: "/posts" },
    { name: "Get Zone Information", img: "/zones.svg", path: "/zoneinfo" },
    { name: "Police Station Near Me", img:"/police.svg", path: "/policestation"},
    { name: "Hospital Near Me", img:"/hospitals.svg", path: "/hospital"}
  ];

  const utilities = [
    { icon: faHouseMedical, names: "Hospital near me", path: "/hospitals" },
    { icon: faFireExtinguisher, names: "Fire emergency", path: "/firestation" },
    { icon: faBuildingShield, names: "Police Station near me", path: "/policestations" },
  ];

  return (
    <div className="bg-white pt-8 mt-2">
    {/* Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 mb-16">
        {services.map((serv, i) => (
          <KeyCard key={i} item={serv} />
        ))}
    </div>
    
      {/* Map */}
      <p className="text-2xl font-bold text-[#2c2c57] mb-2 flex pl-6">Know Your City..</p>
      <HomeMap />
      {/* Footer with Floating SOS Button */}
      <footer className="fixed bottom-0 left-0 w-full h-15 bg-[#ebebf8] flex justify-center items-center z-10 border-t border-[#f2c0c0] pb-safe-area-inset-bottom fixed">
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-20">
          <button
            className="bg-transparent border-none rounded-full w-23 h-23 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-0 mt-[-1rem]"
            aria-label="SOS Button"
          >
            <img
              src="/panicbutton.png"
              alt="SOS"
              className="w-23 h-23 object-cover rounded-full border-none mb-1"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
