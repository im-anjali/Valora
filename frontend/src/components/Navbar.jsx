import { useState } from "react";
import { faHome, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link} from "react-router-dom";
import "../styles/_navbar.scss";
import { faClipboardUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "AboutUs",
      path: "/aboutUs",
      icon: faAddressCard,
    },
    {
      name: "RecentPosts",
      path: "/posts",
      icon: faClipboardUser,
    },
  ];

  return (
    <div className="navbar container">
      <div className="name">
        <Link to="/" className="appname">
          <img src="./logo.png" alt="Valora Logo" />
          <h3>Valora</h3>
        </Link>
        <div className="navbar-links">
          {links.map((linkItem) => (
            <div className="linkitems" key={linkItem.name}>
              <Link to={linkItem.path} className="items">
                <FontAwesomeIcon icon={linkItem.icon} />
                {linkItem.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="signin">
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}
