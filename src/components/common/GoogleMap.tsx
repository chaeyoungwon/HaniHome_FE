"use client";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const GoogleMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!;
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="1f354aa6362bac8ca974a6e8"
        defaultCenter={{ lat, lng }}
        defaultZoom={16}
        gestureHandling="greedy"
        disableDefaultUI={true}
        style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
      >
        <AdvancedMarker position={{ lat, lng }}>
          <Pin />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
