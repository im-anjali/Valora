import "../styles/_home.scss";
import KeyCard from "../components/KeyCard";
export default function Home() {
  const services = [
    {
      name: "Enable Safety Check-in",
      img: "/checkin.svg",
    },
    {
      name: "Find Safe Routes",
      img: "/saferoute.svg",
    },
    {
      name: "Post an Incident",
      img: "/posts.svg",
    },
    {
      name: "Get Zone Information",
      img: "/zones",
    },
  ];
  return (
    <>
      <div className="homepage-background">
        <div className="services">
          {services.map((serv) => (
            <KeyCard item={serv} />
          ))}
        </div>
      </div>
    </>
  );
}
