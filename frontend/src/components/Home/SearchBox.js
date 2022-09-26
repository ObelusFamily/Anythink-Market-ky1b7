import React from "react";

// Using inline styles to sort of match the given design easily, but in reality we would probably use separate style files in this project

const SearchBox = () => {
  return (
    <div
      style={{
        display: "inline-flex",
        margin: "0 10px",
        padding: "0 10px",
        height: "34px",
        width: "350px",
        border: 0,
        borderRadius: "5px",
        backgroundColor: "white",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <input
        id="search-box"
        type="text" // Not using "search" because we don't want to have a delete button
        placeholder="what is it that you truly desire?"
        style={{
          outline: "unset",
          border: "unset",
          width: "100%",
          color: "fieldset",
        }}
      />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i className="ion-search" style={{ color: "#2b1456" }}></i>
      </span>
    </div>
  );
};

export default SearchBox;
