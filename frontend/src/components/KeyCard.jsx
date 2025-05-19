import { Link } from "react-router";
import "../styles/_home.scss";
export default function KeyCard({ item }) {
  return (
    <>
      <Link to={item.path} className="key-card">
        <img className="key-image"src={item.img} />
        <p className="key-name">{item.name}</p>
      </Link>
    </>
  );
}
