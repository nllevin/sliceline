import React, { useState, useEffect } from "react";
import { fetchVenueDetails } from "../util/venue_api_util";
import pizzaIcon from "../assets/pizza_slice.png";
import "../css/venue.css";

const Venue = ({ venue }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const cachedDetails = sessionStorage.getItem(venue.id);
    const cacheExpirationTime = sessionStorage.getItem("expiration");
    const currTime = new Date().getTime();
    const cacheExpired = !cacheExpirationTime || currTime > cacheExpirationTime;

    if (cachedDetails && !cacheExpired) {
      setDetails(JSON.parse(cachedDetails));
    } else {
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
    <div className="venue-details-container">
      <div className="venue-details">
        <img 
          className="venue-image"
          src={details.bestPhoto ? `${details.bestPhoto.prefix}300${details.bestPhoto.suffix}` : pizzaIcon} 
          alt={`Best of ${details.name}`}
        />
        <div className="venue-info">
          <h3><a href={details.canonicalUrl}>{details.name}</a></h3>
          <h3>{details.contact.formattedPhone}</h3>
          <h3>{details.location.address}</h3>
          <h3>Price: {"$".repeat(details.price.tier)}</h3>
          <h3>Rating: {details.rating || "N/A"}</h3>
        </div>
      </div>
      <div className="pizza-border">
        <img className="list-image" src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
        <img className="list-image" src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
        <img className="list-image" src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
      </div>
    </div>
  );
};

export default Venue;