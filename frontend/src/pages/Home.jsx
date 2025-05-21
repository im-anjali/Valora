import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical, faBuildingShield, faFireExtinguisher } from "@fortawesome/free-solid-svg-icons";
import KeyCard from "../components/KeyCard";
import Utilities from "../components/Utilities";
import HomeMap from "../components/HomeMap";

export default function Home() {
  const services = [
    { name: "Safety check-ins", img: "/checkin.svg", path: "/checkins" },
    { name: "Find Safe Routes", img: "/saferoute.svg", path: "/saferoute" },
    { name: "Post an Incident", img: "/posts.svg", path: "/posts" },
    { name: "Get Zone Information", img: "/zones.svg", path: "/zoneinfo" },
  ];

  const utilities = [
    { icon: faHouseMedical, names: "Hospital near me", path: "/hospitals" },
    { icon: faFireExtinguisher, names: "Fire emergency", path: "/firestation" },
    { icon: faBuildingShield, names: "Police Station near me", path: "/policestations" },
  ];

  return (
    <div className="bg-white pt-8 mt-2">
      {/* Services Grid */}
      <div className="grid grid-cols-4 gap-[12rem] px-6 
                      lg:grid-cols-4 sm:grid-cols-1 ml-[2rem]">
        {services.map((serv, i) => (
          <KeyCard key={i} item={serv} />
        ))}
      </div>

      {/* Utilities List */}
      <div className="flex flex-col space-y-4 px-[-2] mt-[2rem] w-full ml-[5rem] mb-6">
        {utilities.map((uti) => (
          <Utilities key={uti.path} item={uti} />
        ))}
      </div>

      {/* Map */}
      <p className="text-2xl font-bold text-[#2c2c57] mb-2 flex pl-6">Know Your City..</p>
      <HomeMap />

      {/* Footer with Floating SOS Button */}
      <footer className="fixed bottom-0 left-0 w-full h-10 bg-[#ebebf8] flex justify-center items-center z-10 border-t border-[#f2c0c0] pb-safe-area-inset-bottom fixed">
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-20">
          <button
            className="bg-transparent border-none rounded-full w-20 h-20 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-0"
            aria-label="SOS Button"
          >
            <img
              src="/panicbutton.png"
              alt="SOS"
              className="w-20 h-20 object-cover rounded-full border-none mb-1"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
