import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Sos from "./components/Sos";
import PrivateRoute from "./pages/PrivateRoute";
export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";
  return (
    <>
       {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/aboutUs" element={<AboutUs />}/>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/zoneinfo" element={<PrivateRoute><ZoneInfo /></PrivateRoute>} />
        <Route path="/saferoute" element={<PrivateRoute><SafeRoute /></PrivateRoute>} />
        <Route path="/hospital" element={<PrivateRoute><NearHosp/></PrivateRoute>} />
        <Route path="/policestation" element={<PrivateRoute><NearPolice/></PrivateRoute>} />
        <Route path="/checkins" element={<PrivateRoute><CheckIns/></PrivateRoute>} />
        <Route path="/posts" element={<PostIncident/>}/>
        <Route path="/sos" element={<PrivateRoute><Sos/></PrivateRoute>} />
      </Routes>
      {!isAuthPage && <PanicButton />}
    </>
  );
}
