import React from "react";

const FormLegend = ({ msg }) => {
  return (
    <legend style={{ backgroundColor: "lavender" }}>
      <h5>{msg}</h5>
    </legend>
  );
};

export default FormLegend;
