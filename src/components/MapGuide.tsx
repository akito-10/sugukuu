import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectPosition } from "../features/positionSlice";

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
};

const options = {
  zoomControl: true,
};

const MapGuide: React.FC = () => {
  const destPos = useSelector(selectPosition);
  const [currLat, setCurrLat] = useState<number>();
  const [currLong, setCurrLong] = useState<number>();
  const [currentDirection, setCurrentDirection] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCyoyefZRTa_NXNG71t--G4vNi0HRyvHOk",
    libraries: ["places"],
  });
  const mapRef = useRef();
  const onMapLoaded = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const origin = { lat: currLat, lng: currLong };
  const destination = { lat: destPos.destLatitude, lng: destPos.destLongitude };

  let watch_id;

  const watchingPosition = () => {
    watch_id = navigator.geolocation.watchPosition(
      getCurrentPosition,
      (err) => {
        alert(err.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  };
  const getCurrentPosition = (position) => {
    setCurrLat(position.coords.latitude);
    setCurrLong(position.coords.longitude);
  };

  watchingPosition();

  const directionsCallback = useCallback((googleResponse) => {
    if (googleResponse) {
      if (currentDirection) {
        if (
          googleResponse.status === "OK" &&
          googleResponse.geocoded_waypoints.length !==
            currentDirection.geocoded_waypoints.length
        ) {
          console.log("ルートが変更されたのでstateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("前回と同じルートのためstateを更新しない");
        }
      } else {
        if (googleResponse.status === "OK") {
          console.log("初めてルートが設定されたため、stateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("前回と同じルートのためstateを更新しない");
        }
      }
    }
  }, []);

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      options={options}
      center={origin}
      onLoad={onMapLoaded}
    >
      <DirectionsService
        options={{
          origin: origin,
          destination: destination,
          travelMode: "WALKING",
          optimizeWaypoints: true,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapGuide;
