import React, { useState, useEffect } from "react";
import {
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "400px",
  position: "relative",
};

const center = {
  lat: 52.373169,
  lng: 4.89066,
};

const Directions = ({ origin, destination, travelMode }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!map || !routesLibrary) return;
    const renderer = new routesLibrary.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
    });
    setDirectionsRenderer(renderer);
    return () => {
      renderer.setMap(null);
    };
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!map || !routesLibrary || !directionsRenderer) return;

    const directionsService = new routesLibrary.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: routesLibrary.TravelMode[travelMode] || routesLibrary.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [map, routesLibrary, directionsRenderer, origin, destination, travelMode]);

  return null;
};

const MovementMap = () => {
  const [travelMode, setTravelMode] = useState("DRIVING");

  // Replace with any location you want
  const origin = "Keizersgracht 123, 1015 CJ Amsterdam";
  const destination = "Rozengracht 55, 1016 LZ Amsterdam";

  return (
    <div style={{ position: "relative" }}>
      {/* Control Panel */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          maxWidth: "300px",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <strong>Starting From:</strong>
          <div>{origin}</div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <strong>Destination:</strong>
          <div>{destination}</div>
        </div>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Mode:
          </label>
          <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
            style={{ padding: "4px" }}
          >
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </div>
      </div>

      <div style={containerStyle}>
        <Map
          defaultCenter={center}
          defaultZoom={14}
          mapTypeControl={false}
          mapId="DEMO_MAP_ID"
        >
          <Directions
            origin={origin}
            destination={destination}
            travelMode={travelMode}
          />
        </Map>
      </div>
    </div>
  );
};

export default MovementMap;
