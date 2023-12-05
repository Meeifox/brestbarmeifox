import React from "react";
import NavBar from "./components/navBar/navBar";
import NavigateMenu from "./components/menu/menu";
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <NavigateMenu />
    </div>
  );
}
