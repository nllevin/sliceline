import React from "react";
import pizzaIcon from "../assets/pizza_slice.png";

const HeaderNav = hasLoc => {
  return (
    <header className="header-nav">
      <h1>
        <img src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
        SliceLine
        <img src={pizzaIcon} alt="SliceLine Pizza Slice Icon" />
      </h1>
    </header>
  );
};

export default HeaderNav;