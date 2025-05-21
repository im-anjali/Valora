import { Link } from "react-router-dom";

export default function KeyCard({ item }) {
  return (
    <Link
      to={item.path}
      className="bg-white no-underline border-3 border-[#c0c0e0] rounded-3xl
                 h-[200px] w-[310px] mx-auto flex flex-col items-center justify-center
                 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out
                 hover:-translate-y-1 hover:shadow-none"
    >
      <img
        src={item.img}
        alt={item.name}
        className="h-25 w-25 mb-2 object-contain bg-white rounded-none border-none mt-1"
      />
      <p className="text-2xl font-bold text-[#2c2c57]">{item.name}</p>
    </Link>
  );
}
