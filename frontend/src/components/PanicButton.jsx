import {Link} from "react-router-dom";

export default function PanicButton() {
  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full h-13 bg-[#ebebf8] flex justify-center items-center z-[9999] border-t border-[#f2c0c0] pb-safe-area-inset-bottom">
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-[9999]">
        <Link to="/sos">
          <button
            className="bg-white border-[#c0c0e0] rounded-full w-[92px] h-[92px] shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-0"
            aria-label="SOS Button"
          >
            <img
              src="/panicb.jpg"
              alt="SOS"
              className="w-[92px] h-[92px] object-cover rounded-full border-none"
            />
          </button>
          </Link>
        </div>
      </footer>
    </>
  );
}
