import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OSMMap = () => {
  // Default position set to Amsterdam
  const position = [52.3676, 4.9041];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marker for Amsterdam */}
      <Marker position={position}>
        <Popup>Amsterdam, Netherlands 🇳🇱</Popup>
      </Marker>
    </MapContainer>
  );
};

export default OSMMap;
