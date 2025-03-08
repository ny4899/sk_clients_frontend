import React from "react";
function AdminRoute({ userType, children }) {
  if (userType === "admin") {
    return children;
  }
  return <h1>Admin only page you cannot access this page</h1>;
}
export default AdminRoute;
