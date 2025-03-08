import React from "react";
function ClientRoute({ userType, children }) {
  if (
    userType === "admin" ||
    userType === "serviceengineer" ||
    userType === "client" ||
    userType === "partner"
  ) {
    return children;
  } else {
    return <h1>User can access this page</h1>;
  }
}
export default ClientRoute;
