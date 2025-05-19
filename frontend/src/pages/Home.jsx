import "../styles/_home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical, faBuildingShield, faFireExtinguisher } from "@fortawesome/free-solid-svg-icons";
import KeyCard from "../components/KeyCard";
import Utilities from "../components/Utilities";
export default function Home() {
  const services = [
    {
      name: "Safety check-ins",
      img: "/checkin.svg",
      path: "/checkins"
    },
    {
      name: "Find Safe Routes",
      img: "/saferoute.svg",
      path: "/saferoute"
    },
    {
      name: "Post an Incident",
      img: "/posts.svg",
      path: "/posts"
    },
    {
      name: "Get Zone Information",
      img: "/zones.svg",
      path: "/zoneinfo"
    },
  ];

  const utilities=[
    {
      icon: faHouseMedical,
      names: "Hospital near me",
      path:"/hospitals"
    },
    {
      icon: faFireExtinguisher,
      names: "Fire emergency ",
      path:"/firestation"
    },
    {
      icon: faBuildingShield,
      names: "Police Sation near me",
      path: "/policestations"
    },
  ]
  return (
    <>
      <div className="homepage-background">
        <div className="services">
          {services.map((serv, index) => (
         <KeyCard key={index} item={serv} />
          ))}
        </div>
        <div className="uti-container">
           <div className="utilities">
          {
            utilities.map((uti)=>(
              <Utilities item={uti}/>
            ))
          }
        </div>
        <div className="photo">
          <img src="/homepage.png"/>
        </div>
        </div>
       <footer className="home-footer">
        <div className="sos-button-container">
              <button className="sos-button">
             <img src="/panicbutton.png" alt="SOS" className="sos-img" />
         </button>
        </div>
       </footer>
      </div>
    </>
  );
}
