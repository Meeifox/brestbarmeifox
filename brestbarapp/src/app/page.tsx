import React from "react";
import NavBar from "./components/navBar/navBar";
import NavigateMenu from "./components/menu";
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <div>
      <NavBar />
      <NavigateMenu />

    </div>
  );
}
