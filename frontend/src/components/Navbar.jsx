import { faHome, faAddressCard, faClipboardUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/", icon: faHome },
    { name: "About Us", path: "/aboutus", icon: faAddressCard },
    { name: "RecentPosts", path: "/posts", icon: faClipboardUser },
  ];

  return (
    <div className="h-[60px] bg-[#b5b5f0] text-black flex items-center justify-between rounded-md pl-4 gap-8">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-[1.5em] font-bold text-[#1e3a8a] no-underline drop-shadow-sm">
        <img
           src="./logo.png"
           alt="Valora Logo"
           className="w-[35px] h-[35px] rounded-full object-cover"
        /><h3 className="mt-0.7 items-center">Valora</h3>
        </Link>
        <div className="ml-4 cursor-pointer flex gap-4">
          {links.map((linkItem) => (
            <div className="relative" key={linkItem.name}>
              <Link
                to={linkItem.path}
                className="flex gap-2 text-black no-underline pb-[2px] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300"
              >
                <FontAwesomeIcon icon={linkItem.icon} />
                {linkItem.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
