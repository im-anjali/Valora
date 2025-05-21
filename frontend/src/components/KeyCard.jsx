import { Link } from "react-router-dom";

export default function KeyCard({ item }) {
  return (
    <Link
      to={item.path}
      className="bg-white no-underline border-3 border-[#c0c0e0] rounded-3xl
                 h-[200px] w-full flex flex-col items-center justify-center
                 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out
                 hover:-translate-y-1 hover:shadow-none gap-1rem"
    >
      <img
        src={item.img}
        alt={item.name}
        className="h-19 w-19 sm:h-20 sm:w-20 mb-2 object-contain mt-2"
      />
      <p className="text-base sm:text-lg md:text-2xl font-bold text-[#2c2c57] text-center px-2">
        {item.name}
      </p>
    </Link>
  );
}
