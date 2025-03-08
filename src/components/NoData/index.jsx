import React from "react";
import noDataImg from "../../images/cloud.png";

const NoData = ({ dataMessage }) => {
  return (
    <div className="box_bg rounded-1 p-4 mt-3">
      <h5 className="text-center py-3">{dataMessage}</h5>
      <div className="d-flex align-items-center justify-content-center">
        <img style={{ width: "200px" }} src={noDataImg} alt="" />
      </div>
    </div>
  );
};

export default NoData;
