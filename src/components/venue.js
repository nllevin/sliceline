import React, { useState, useEffect } from "react";
import { fetchVenueDetails } from "../util/venue_api_util";

const Venue = ({ venue }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const cachedDetails = sessionStorage.getItem(venue.id);
    const cacheExpirationTime = sessionStorage.getItem("expiration");
    const currTime = new Date().getTime();
    const cacheExpired = !cacheExpirationTime || currTime > cacheExpirationTime;

    if (cachedDetails && !cacheExpired) {
      console.log("good");
      setDetails(JSON.parse(cachedDetails));
    } else {
      console.log("hi");
      fetchVenueDetails(venue.id)
        .then(({ data }) => {
          if (cacheExpired) {
            sessionStorage.setItem("expiration", currTime + 3 * 60 * 60 * 1000);
          }

          const newDetails = data.response.venue;
          sessionStorage.setItem(venue.id, JSON.stringify(newDetails));
          setDetails(newDetails);
        })
        .catch(err => console.log(err));
    }
  }, [venue.id]);
  
  if (!details) return "";
  return (
    <div className="venues-details">
      {details.name}
    </div>
  );
};

export default Venue;