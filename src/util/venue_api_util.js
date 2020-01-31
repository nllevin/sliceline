import axios from "axios";
const keys = require("../config/keys");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || keys.CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || keys.CLIENT_SECRET;

export const fetchVenues = ({ latitude, longitude }) => {
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("ll", `${latitude},${longitude}`);
  params.append("query", "pizza");
  params.append("limit", "10");
  params.append("v", "20200131");
  return axios.get(`https://api.foursquare.com/v2/venues/search?${params.toString()}`);
};

export const fetchVenueDetails = venueId => {
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("v", "20200131");
  return axios.get(`https://api.foursquare.com/v2/venues/${venueId}?${params.toString()}`);
};