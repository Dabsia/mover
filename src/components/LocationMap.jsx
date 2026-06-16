// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   useMap,
//   useMapsLibrary,
// } from "@vis.gl/react-google-maps";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import "./locationMap.css";

// const LocationMap = ({
//   fromPickupLongitude,
//   fromPickupLatitude,
//   toDropOffLongitude,
//   toDropOffLatitude,
// }) => {
//   const { pickUpLongitude, pickUpLatitude, dropOffLongitude, dropOffLatitude } =
//     useSelector((state) => state?.user?.userMoveInfo || {});

//   const [point1, setPoint1] = useState(null);
//   const [point2, setPoint2] = useState(null);

//   useEffect(() => {
//     // Default coordinates (Tartu, Estonia as pickup and Tallinn, Estonia as dropoff)
//     const DEFAULT_PICKUP = { lat: 58.3776, lng: 26.729 };
//     const DEFAULT_DROPOFF = { lat: 59.437, lng: 24.7536 };

//     const pickup = {
//       lat:
//         Number(fromPickupLatitude) ||
//         Number(pickUpLatitude) ||
//         DEFAULT_PICKUP.lat,
//       lng:
//         Number(fromPickupLongitude) ||
//         Number(pickUpLongitude) ||
//         DEFAULT_PICKUP.lng,
//     };

//     const dropoff = {
//       lat:
//         Number(toDropOffLatitude) ||
//         Number(dropOffLatitude) ||
//         DEFAULT_DROPOFF?.lat,
//       lng:
//         Number(toDropOffLongitude) ||
//         Number(dropOffLongitude) ||
//         DEFAULT_DROPOFF?.lng,
//     };

//     setPoint1(pickup);
//     setPoint2(dropoff);
//   }, [
//     fromPickupLatitude,
//     fromPickupLongitude,
//     toDropOffLatitude,
//     toDropOffLongitude,
//     pickUpLatitude,
//     pickUpLongitude,
//     dropOffLatitude,
//     dropOffLongitude,
//   ]);

//   if (!point1 || !point2) return null;

//   return (
//     <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <div
//         style={{ width: "100%" }} className="pb-4 map w-full rounded-[16px] h-[450px] md:w-[270px]">
//         <Map
//           defaultCenter={point1}
//           defaultZoom={10}
//           mapTypeControl={false}
//           mapId="YOUR_MAP_ID"
//           rotateControl={false}
//           gmpClickable={false}
//           streetViewControl={false}
//         >
//           <AdvancedMarker position={point1} />
//           <AdvancedMarker position={point2} />
//           <DirectionsRoute point1={point1} point2={point2} />
//         </Map>
//       </div>
//     </APIProvider>
//   );
// };

// const DirectionsRoute = ({ point1, point2 }) => {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const mapsLibrary = useMapsLibrary("maps");
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {
//     if (!map || !routesLibrary || !mapsLibrary) return;

//     const directionsService = new routesLibrary.DirectionsService();
//     const directionsRenderer = new routesLibrary.DirectionsRenderer({
//       map: map,
//       suppressMarkers: true,
//       polylineOptions: {
//         strokeColor: "#4285F4",
//         strokeWeight: 5,
//         strokeOpacity: 0.8,
//       },
//     });

//     directionsService.route(
//       {
//         origin: point1,
//         destination: point2,
//         travelMode: routesLibrary.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK" && result) {
//           directionsRenderer.setDirections(result);

//           const route = result.routes[0].legs[0];
//           setDistance(route.distance.text);
//           setDuration(route.duration.text);
//         } else {
//           console.error("Directions request failed:", status);
//         }
//       }
//     );

//     return () => {
//       directionsRenderer.setMap(null);
//     };
//   }, [map, routesLibrary, mapsLibrary, point1, point2]);

//   return null;
// };

// export default LocationMap;


import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// Geoapify API configuration
const GEOAPIFY_API_KEY = "d7c8b8559d364a6a9323242c3a4bbe51";

const LocationMap = ({
  fromPickupLongitude,
  fromPickupLatitude,
  toDropOffLongitude,
  toDropOffLatitude,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const infoControlRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const { pickUpLongitude, pickUpLatitude, dropOffLongitude, dropOffLatitude } =
    useSelector((state) => state?.user?.userMoveInfo || {});

  // Load Leaflet CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    const loadMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');

        // Default coordinates (Tartu, Estonia)
        const DEFAULT_PICKUP = { lat: 58.3776, lng: 26.729 };
        const DEFAULT_DROPOFF = { lat: 59.437, lng: 24.7536 };

        const pickup = {
          lat: Number(fromPickupLatitude) || Number(pickUpLatitude) || DEFAULT_PICKUP.lat,
          lng: Number(fromPickupLongitude) || Number(pickUpLongitude) || DEFAULT_PICKUP.lng,
        };

        const dropoff = {
          lat: Number(toDropOffLatitude) || Number(dropOffLatitude) || DEFAULT_DROPOFF.lat,
          lng: Number(toDropOffLongitude) || Number(dropOffLongitude) || DEFAULT_DROPOFF.lng,
        };

        // Calculate center between pickup and dropoff
        const centerLat = (pickup.lat + dropoff.lat) / 2;
        const centerLng = (pickup.lng + dropoff.lng) / 2;

        const mapInstance = L.map(mapRef.current, {
          center: [centerLat, centerLng],
          zoom: 8,
          zoomControl: true,
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstance);

        mapInstanceRef.current = mapInstance;
        setMapLoaded(true);

        // Add markers and route
        await addMarkersAndRoute(mapInstance, L, pickup, dropoff);

        // Cleanup
        return () => {
          mapInstance.remove();
          mapInstanceRef.current = null;
          setMapLoaded(false);
        };
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMap();
  }, []);

  // Update markers and route when coordinates change
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    const updateMap = async () => {
      try {
        const L = await import('leaflet');

        // Default coordinates
        const DEFAULT_PICKUP = { lat: 58.3776, lng: 26.729 };
        const DEFAULT_DROPOFF = { lat: 59.437, lng: 24.7536 };

        const pickup = {
          lat: Number(fromPickupLatitude) || Number(pickUpLatitude) || DEFAULT_PICKUP.lat,
          lng: Number(fromPickupLongitude) || Number(pickUpLongitude) || DEFAULT_PICKUP.lng,
        };

        const dropoff = {
          lat: Number(toDropOffLatitude) || Number(dropOffLatitude) || DEFAULT_DROPOFF.lat,
          lng: Number(toDropOffLongitude) || Number(dropOffLongitude) || DEFAULT_DROPOFF.lng,
        };

        const mapInstance = mapInstanceRef.current;

        // Clear existing markers and route
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (routeLayerRef.current) {
          routeLayerRef.current.remove();
          routeLayerRef.current = null;
        }

        if (infoControlRef.current) {
          infoControlRef.current.remove();
          infoControlRef.current = null;
        }

        // Add new markers and route
        await addMarkersAndRoute(mapInstance, L, pickup, dropoff);

        // Fit bounds to show all markers
        const bounds = L.latLngBounds([pickup, dropoff]);
        if (bounds.isValid()) {
          mapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }

      } catch (error) {
        console.error('Error updating map:', error);
      }
    };

    updateMap();
  }, [
    mapLoaded,
    fromPickupLatitude,
    fromPickupLongitude,
    toDropOffLatitude,
    toDropOffLongitude,
    pickUpLatitude,
    pickUpLongitude,
    dropOffLatitude,
    dropOffLongitude,
  ]);

  // Function to add markers and route
  const addMarkersAndRoute = async (mapInstance, L, pickup, dropoff) => {
    try {
      // Create custom icons with Tailwind styles
      const pickupIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <span class="text-white text-xs font-bold">P</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const dropoffIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <span class="text-white text-xs font-bold">D</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Add pickup marker
      const pickupMarker = L.marker([pickup.lat, pickup.lng], {
        icon: pickupIcon,
      }).addTo(mapInstance);

      pickupMarker.bindPopup(`
        <div class="p-1">
          <strong class="text-gray-800 block mb-1">Pickup Location</strong>
          <p class="text-gray-600 text-xs">Lat: ${pickup.lat.toFixed(6)}</p>
          <p class="text-gray-600 text-xs">Lng: ${pickup.lng.toFixed(6)}</p>
        </div>
      `);
      markersRef.current.push(pickupMarker);

      // Add dropoff marker
      const dropoffMarker = L.marker([dropoff.lat, dropoff.lng], {
        icon: dropoffIcon,
      }).addTo(mapInstance);

      dropoffMarker.bindPopup(`
        <div class="p-1">
          <strong class="text-gray-800 block mb-1">Drop-off Location</strong>
          <p class="text-gray-600 text-xs">Lat: ${dropoff.lat.toFixed(6)}</p>
          <p class="text-gray-600 text-xs">Lng: ${dropoff.lng.toFixed(6)}</p>
        </div>
      `);
      markersRef.current.push(dropoffMarker);

      // Draw route using Geoapify Routing API
      await drawRoute(mapInstance, L, pickup, dropoff);

    } catch (error) {
      console.error('Error adding markers and route:', error);
    }
  };

  // Draw route using Geoapify Routing API
  const drawRoute = async (mapInstance, L, origin, destination) => {
    try {
      // Geoapify Routing API endpoint
      const url = `https://api.geoapify.com/v1/routing?waypoints=${origin.lat},${origin.lng}|${destination.lat},${destination.lng}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const route = data.features[0];
        const coordinates = route.geometry.coordinates;

        // Convert GeoJSON coordinates to Leaflet latlng format
        const latlngs = coordinates.map(coord => [coord[1], coord[0]]);

        // Draw the route on the map
        routeLayerRef.current = L.polyline(latlngs, {
          color: '#4285F4',
          weight: 4,
          opacity: 0.8,
        }).addTo(mapInstance);

        // Add route info
        const routeInfo = route.properties || {};
        const distanceMeters = routeInfo.distance || 0;
        const timeSeconds = routeInfo.time || 0;

        // Format distance
        let distanceText = '';
        if (distanceMeters >= 1000) {
          distanceText = `${(distanceMeters / 1000).toFixed(1)} km`;
        } else {
          distanceText = `${Math.round(distanceMeters)} m`;
        }

        // Format time
        let timeText = '';
        if (timeSeconds >= 3600) {
          const hours = Math.floor(timeSeconds / 3600);
          const minutes = Math.round((timeSeconds % 3600) / 60);
          timeText = `${hours}h ${minutes}m`;
        } else if (timeSeconds >= 60) {
          timeText = `${Math.round(timeSeconds / 60)} min`;
        } else {
          timeText = `${Math.round(timeSeconds)} sec`;
        }

        setDistance(distanceText);
        setDuration(timeText);

        // Add info control with Tailwind styles
        const InfoControl = L.Control.extend({
          onAdd: function () {
            const div = L.DomUtil.create('div');
            div.className = 'bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium';
            div.innerHTML = `
              <div class="flex flex-col gap-1">
                <span class="text-gray-700">📍 ${distanceText}</span>
                <span class="text-gray-700">⏱️ ${timeText}</span>
              </div>
            `;
            return div;
          }
        });

        infoControlRef.current = new InfoControl({ position: 'bottomleft' });
        infoControlRef.current.addTo(mapInstance);

      } else {
        console.log('No route found');
        // Draw straight line as fallback
        drawStraightLine(mapInstance, L, origin, destination);
      }
    } catch (error) {
      console.error('Error drawing route:', error);
      // Fallback: Draw a straight line
      drawStraightLine(mapInstance, L, origin, destination);
    }
  };

  // Draw straight line fallback
  const drawStraightLine = (mapInstance, L, origin, destination) => {
    try {
      const latlngs = [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      ];

      routeLayerRef.current = L.polyline(latlngs, {
        color: '#4285F4',
        weight: 3,
        opacity: 0.5,
        dashArray: '5, 10',
      }).addTo(mapInstance);

      setDistance('Distance unavailable');
      setDuration('Time unavailable');
    } catch (fallbackError) {
      console.error('Fallback route drawing failed:', fallbackError);
    }
  };

  // Show loading or empty state
  if (!fromPickupLatitude && !fromPickupLongitude && !toDropOffLatitude && !toDropOffLongitude) {
    return (
      <div className="pb-4 w-full rounded-[16px] h-[450px] md:w-[270px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Enter locations to see the map</p>
      </div>
    );
  }

  return (
    <div className="pb-4 w-full rounded-[16px] h-[450px] md:w-[270px] relative">
      <div ref={mapRef} className="w-full h-full rounded-[16px]" />

      {/* Distance and duration overlay with Tailwind */}
      {distance && duration && (
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium z-[1000]">
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-700">📍 {distance}</span>
            <span className="text-gray-700">⏱️ {duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;