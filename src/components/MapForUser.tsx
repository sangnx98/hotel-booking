import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

export interface MapPageProp {}

export default function UserMap(props: { lat: any; lng: any }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDPWEF89bAYMn5WTTvvzJo6wSJ7RuidG8A",
  });

  return (
    <Box sx={{ height: "50vh" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={props}
          zoom={16}
        >
          <Marker position={props} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </Box>
  );
}
