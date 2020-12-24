import React, { useCallback, useState } from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectPosition } from "../features/positionSlice";

type Props = {
  lat: number | undefined;
  lng: number | undefined;
};

const MapContents: React.FC<Props> = (props) => {
  const destPos = useSelector(selectPosition);
  const [currDire, setCurrDire] = useState<any>(null);
  const origin = { lat: props.lat, lng: props.lng };
  const destination = {
    lat: Number(destPos.destLatitude),
    lng: Number(destPos.destLongitude),
  };
  console.log(origin);
  console.log(destination);

  const directionsCallback = useCallback((response) => {
    console.log(response);
    if (response) {
      if (currDire) {
        if (
          response.status === "OK" &&
          response.geocoded_waypoints.length !==
            currDire.geocoded_waypoints.length
        ) {
          setCurrDire(response);
        }
      } else {
        if (response.status === "OK") {
          setCurrDire(response);
        }
      }
    }
  }, []);

  return (
    <>
      {origin && destination && (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: "WALKING",
          }}
          callback={directionsCallback}
        />
      )}
      {currDire && (
        <DirectionsRenderer
          options={{
            direction: currDire,
          }}
        />
      )}
    </>
  );
};

export default MapContents;
