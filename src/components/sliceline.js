import React, { useState, useEffect } from "react";
import { fetchVenues } from "../util/venue_api_util.js";

const Sliceline = () => {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => setCoords(coords));
  });

  return null;
};

export default Sliceline;