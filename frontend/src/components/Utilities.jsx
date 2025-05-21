import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Utilities({ item }) {
  return (
    <Link
      to={item.path}
      className="rounded-full border-3 border-[#c0c0e0] bg-white shadow-md
                 h-15 w-full flex items-center justify-between
                 text-lg mb-4 no-underline transition-transform duration-200 ease-in-out
                 hover:-translate-y-1 hover:shadow-none"
    >
      <div className="flex items-center px-4 gap-4">
        <FontAwesomeIcon
          icon={item.icon}
          className="text-[#2c2c57] text-2xl ml-4"
        />
        <p className="text-[#2c2c57] text-xl">{item.names}</p>
      </div>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="text-[#2c2c57] text-3xl mr-8"
      />
    </Link>
  );
}
