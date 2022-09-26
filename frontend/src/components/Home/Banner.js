import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import SearchBox from "./SearchBox";

const Banner = (props) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to </span>
          <span
            onClick={() => {
              setIsSearchActive(true);
            }}
          >
            get
          </span>
          {isSearchActive && (
            <SearchBox
              onTitleSearch={props.onTitleSearch}
              onResetSearch={props.onResetSearch}
            />
          )}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
