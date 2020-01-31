import React, { useState, useEffect } from "react";
import HeaderNav from "./header_nav";
import { fetchVenues } from "../util/venue_api_util";
import "../css/sliceline.css";
import pizzaIcon from "../assets/pizza_slice.png";

const Sliceline = () => {
  const [started, setStarted] = useState(false);
  const [venues, setVenues] = useState(null);

  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => {
      fetchVenues(coords)
        .then(({ data }) => {
          setVenues(data.response.venues);
        })
        .catch(err => console.log(err));
    });
  });

  return (
    <div className="top-container">
      <HeaderNav />
      {
        venues && started ? (
          <main></main>
        ) : (
          <main className="loading-placeholder">
            <img src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
            <button 
              className={started ? "start-button inactive" : "start-button"}
              onClick={e => {
                e.preventDefault();
                setStarted(true);
              }}
            >
              Find Pizza!
            </button>
          </main>
        )
      }
      <footer className="icon-attribution">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
    </div>
  )
};

export default Sliceline;