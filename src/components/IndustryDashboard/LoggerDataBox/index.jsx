import React from "react";
import "./LoggerDataBox.scss";

const LoggerDataBox = ({ data }) => {
  let lastRecived = "";
  if (data.created_at)
    lastRecived = data.created_at.split("+")[0].split("T").join(" ");

  return (
    <div className="col-6 col-lg-3 col-xxl-2">
      <div className="box_bg rounded-1 p-2 shadow h-100">
        <div
          className={`value_bar rounded-1 ${
            typeof data.value !== "number" ||
            data.value < data.min_std_value ||
            data.value > data.max_std_value
              ? "tomato_red_bg"
              : "light_green_bg"
          } py-2 mb-3`}
        >
          <h3>
            {typeof data.value === "number"
              ? data.value
              : data.value
              ? data.value
              : "n/a"}
            <span>
              {" "}
              {data.value && typeof data.value === "number"
                ? data.parameter_unit
                : ""}
            </span>
          </h3>
        </div>
        <div className="px-1">
          <h5>{data.parameter_name.split("_").join(" ")}</h5>
          <p>{data.station_name}</p>
          <p>
            Std Val :{" "}
            <span>{`${data.min_std_value} - ${data.max_std_value}`}</span>
          </p>
          <p>
            Last recvd :{" "}
            <span>
              {lastRecived && typeof data.value === "number"
                ? lastRecived
                : "--"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggerDataBox;
