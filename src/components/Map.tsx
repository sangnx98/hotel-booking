import axios from "axios";
import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCenter } from "geolib";

export default function MapBox({ addressDetail }: { addressDetail: string }) {
  console.log("address", addressDetail);
  const [showPopup, toggelPopup] = useState(false);
  const [addressMarker, setAddressMarker] = useState<any[]>([]);

  const addressData = [
    {
      id: 1,
      address: " 44 Triều Khúc Thanh Xuân Hà Nội",
    },
  ];

  useEffect(() => {
    let newArr: any[] = [];
    addressData.map((address) =>
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressDetail}.json?access_token=pk.eyJ1Ijoic2FuZ254MTk5OCIsImEiOiJjbDIwM3NjNmkwc2t1M2NvMzQ0enFvZzZpIn0.GnBvcHJhZXPMfHOy0SVVXg`
        )
        .then((res) => {
          console.log(res);
          newArr.push({
            ...address,
            longitude: res.data.features[0].center[0],
            latitude: res.data.features[0].center[1],
          });
        })
    );
    setAddressMarker(newArr);
  }, []);

  const coordinates = addressMarker.map((address) => ({
    longitude: address.longitude,
    latitude: address.latitude,
  }));

  console.log('address', addressMarker);

  return (
    <>
      <Map
        style={{ width: "100%", height: 500 }}
        mapboxAccessToken="pk.eyJ1Ijoic2FuZ254MTk5OCIsImEiOiJjbDIwM3NjNmkwc2t1M2NvMzQ0enFvZzZpIn0.GnBvcHJhZXPMfHOy0SVVXg"
        initialViewState={{
          longitude: 105.77772113775598,
          latitude: 21,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {addressMarker.map((address) => {
          <Marker
            longitude={address.longitude}
            latitude={address.latitude}
            anchor="bottom"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <LocationOnIcon />
          </Marker>;
        })}
      </Map>
    </>
  );
}
