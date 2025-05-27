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

  return (
    <div className="bg-white pt-8 mt-2">
    {/* Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 mb-16">
        {services.map((serv, i) => (
          <KeyCard key={i} item={serv} />
        ))}
    </div>
    
      {/* Map */}
      <HomeMap/>
    </div>
  );
}
