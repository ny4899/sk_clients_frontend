import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  const inputCss = {
    maxWidth: "350px",
    width: "100%",
  };
  return (
    <input
      className="form-control mb-3"
      style={inputCss}
      type="search"
      placeholder="Search"
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default GlobalFilter;
