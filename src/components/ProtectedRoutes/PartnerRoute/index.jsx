import React from "react";
function PartnerRoute({ userType, children }) {
  if (
    userType === "admin" ||
    userType === "serviceengineer" ||
    userType === "partner"
  ) {
    return children;
  }
  return <h1>Only admin service engineers & partner can access this page</h1>;
}
export default PartnerRoute;
