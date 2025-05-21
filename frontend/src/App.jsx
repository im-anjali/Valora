import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
     <Navbar/>
      {/* <div className="container main"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "/aboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      {/* </div> */}
    </>
  );
}
