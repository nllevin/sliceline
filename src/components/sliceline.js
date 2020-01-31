import React, { useState, useEffect } from "react";
import HeaderNav from "./header_nav";
import { fetchVenues } from "../util/venue_api_util";
import "../css/sliceline.css";
import pizzaIcon from "../assets/pizza_slice.png";

const Sliceline = () => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => setCoords(coords));
  });

  const [venues, setVenues] = useState(null);

  return (
    <div className="top-container">
      <HeaderNav hasLoc={!!coords} />
      {
        coords && venues ? (
          <main></main>
        ) : (
          <main className="loading-placeholder">
            <img src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
          </main>
        )
      }
      <footer>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
    </div>
  )
};

export default Sliceline;