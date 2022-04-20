import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";
// import "./MapPage.css";

export interface MapPageProp {}

export default function Map() {
  const [positions, setPosition] = useState("");
  const [center, setCenter] = useState<any>({
    lat: 20.989008855293775,
    lng: 105.79464912414551
  });
  console.log('center', center)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDPWEF89bAYMn5WTTvvzJo6wSJ7RuidG8A"
  });

  // const center = ;
  const onCLickMap = (event: any) => {
    const data = event.latLng.toJSON();
    setCenter(data);
  };

  return (
    <Box sx={{height: '50vh'}}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={16}
          onClick={onCLickMap}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </Box>
  );
}
