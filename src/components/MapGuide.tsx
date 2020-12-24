import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapContents from "./MapContents";

type Position = {
  lat: number;
  lng: number;
};

const MapGuide: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCyoyefZRTa_NXNG71t--G4vNi0HRyvHOk",
  });
  const [currPos, setCurrPos] = useState<Position>();
  let watching_id;

  const watchingPos = () => {
    watching_id = navigator.geolocation.watchPosition(
      getCurrPos,
      (err) => {
        alert(err.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  };

  const getCurrPos = (position: any) => {
    setCurrPos({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{
          height: "100vh",
          width: "100%",
        }}
        center={(currPos?.lat, currPos?.lng)}
        zoom={8}
        onLoad={() => {
          watchingPos();
        }}
      >
        <MapContents lat={currPos?.lat} lng={currPos?.lng} />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>上手く読み込めませんでした。</div>;
  }

  return isLoaded ? renderMap() : <div></div>;
};

export default MapGuide;
