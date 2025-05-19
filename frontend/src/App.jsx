import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </>
  );
}
