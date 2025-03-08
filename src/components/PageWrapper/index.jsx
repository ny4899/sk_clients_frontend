import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="container-fluid px-3 py-2">
      <div className="row gy-2">{children}</div>
    </div>
  );
};

export default PageWrapper;
