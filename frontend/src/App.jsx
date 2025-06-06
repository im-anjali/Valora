import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UpdateUser from "./pages/UpdateUser";
import ZoneInfo from "./pages/ZoneInfo";
import SafeRoute from "./pages/SafeRoute";
import PanicButton from "./components/PanicButton";
import NearHosp from "./pages/NearHosp";
import NearPolice from "./components/NearPolice";
import CheckIns from "./pages/CheckIns";
import PostIncident from "./pages/PostIncident";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/zoneinfo" element={<ZoneInfo />} />
        <Route path="/saferoute" element={<SafeRoute />} />
        <Route path="/hospital" element={<NearHosp/>} />
        <Route path="/policestation" element={<NearPolice/>} />
        <Route path="/checkins" element={<CheckIns/>} />
        <Route path="/posts" element={<PostIncident/>}/>
      </Routes>
      <PanicButton/>
    </>
  );
}
