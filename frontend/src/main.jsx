import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> 
    <UserContext>
      <App />
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
);
