import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./locationMap.css";

const LocationMap = ({
  fromPickupLongitude,
  fromPickupLatitude,
  toDropOffLongitude,
  toDropOffLatitude,
}) => {
  const { pickUpLongitude, pickUpLatitude, dropOffLongitude, dropOffLatitude } =
    useSelector((state) => state?.user?.userMoveInfo || {});

  const [point1, setPoint1] = useState(null);
  const [point2, setPoint2] = useState(null);

  useEffect(() => {
    // Default coordinates (Tartu, Estonia as pickup and Tallinn, Estonia as dropoff)
    const DEFAULT_PICKUP = { lat: 58.3776, lng: 26.729 };
    const DEFAULT_DROPOFF = { lat: 59.437, lng: 24.7536 };

    const pickup = {
      lat:
        Number(fromPickupLatitude) ||
        Number(pickUpLatitude) ||
        DEFAULT_PICKUP.lat,
      lng:
        Number(fromPickupLongitude) ||
        Number(pickUpLongitude) ||
        DEFAULT_PICKUP.lng,
    };

    const dropoff = {
      lat:
        Number(toDropOffLatitude) ||
        Number(dropOffLatitude) ||
        DEFAULT_DROPOFF?.lat,
      lng:
        Number(toDropOffLongitude) ||
        Number(dropOffLongitude) ||
        DEFAULT_DROPOFF?.lng,
    };

    setPoint1(pickup);
    setPoint2(dropoff);
  }, [
    fromPickupLatitude,
    fromPickupLongitude,
    toDropOffLatitude,
    toDropOffLongitude,
    pickUpLatitude,
    pickUpLongitude,
    dropOffLatitude,
    dropOffLongitude,
  ]);

  if (!point1 || !point2) return null;

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div
        style={{ width: "100%" }} className="pb-4 map w-full rounded-[16px] h-[450px] md:w-[270px]">
        <Map
          defaultCenter={point1}
          defaultZoom={10}
          mapTypeControl={false}
          mapId="YOUR_MAP_ID"
          rotateControl={false}
          gmpClickable={false}
          streetViewControl={false}
        >
          <AdvancedMarker position={point1} />
          <AdvancedMarker position={point2} />
          <DirectionsRoute point1={point1} point2={point2} />
        </Map>
      </div>
    </APIProvider>
  );
};

const DirectionsRoute = ({ point1, point2 }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const mapsLibrary = useMapsLibrary("maps");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!map || !routesLibrary || !mapsLibrary) return;

    const directionsService = new routesLibrary.DirectionsService();
    const directionsRenderer = new routesLibrary.DirectionsRenderer({
      map: map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });

    directionsService.route(
      {
        origin: point1,
        destination: point2,
        travelMode: routesLibrary.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);

          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, routesLibrary, mapsLibrary, point1, point2]);

  return null;
};

export default LocationMap;
