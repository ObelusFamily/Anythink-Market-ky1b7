import React from "react";
import agent from "../../agent";

// Using inline styles to sort of match the given design easily, but in reality we would probably use separate style files in this project

const SearchBox = (props) => {
  const onTextChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length < 3) {
      props.onResetSearch();
      return;
    }

    props.onTitleSearch(
      newValue,
      (page) => agent.Items.byTitle(newValue, page),
      agent.Items.byTitle(newValue)
    );
  };

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
        onChange={onTextChange}
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
