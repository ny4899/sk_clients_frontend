import React from "react";
function ServiceEngineerRoute({ userType, children }) {
  if (userType === "admin" || userType === "serviceengineer") {
    return children;
  }
  return <h1>Only admin & service engineer can access this page</h1>;
}
export default ServiceEngineerRoute;
