import React from 'react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import './ViewLocationMap.css';

const center = {
  lat: 6.5244,
  lng: 3.3792
};

const ViewLocationMap = () => {
  return (
    <div className="map-container" style={{ width: '100%', height: '206px' }}>
      <Map
        defaultCenter={center}
        defaultZoom={14}
        mapTypeControl={false}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
      >
        <AdvancedMarker position={center} />
      </Map>
    </div>
  );
};

export default ViewLocationMap;
