import React, { useEffect, useState } from "react";
import "./industryInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const generateDateStr = (d) =>
  `${
    String(d.getDate()).length < 2
      ? "0" + String(d.getDate())
      : String(d.getDate())
  }/${
    String(d.getMonth() + 1).length < 2
      ? "0" + String(d.getMonth() + 1)
      : String(d.getMonth() + 1)
  }/${
    String(d.getFullYear()).length < 2
      ? "0" + String(d.getFullYear())
      : String(d.getFullYear())
  } ${
    String(d.getHours()).length < 2
      ? "0" + String(d.getHours())
      : String(d.getHours())
  }:${
    String(d.getMinutes()).length < 2
      ? "0" + String(d.getMinutes())
      : String(d.getMinutes())
  }:${
    String(d.getSeconds()).length < 2
      ? "0" + String(d.getSeconds())
      : String(d.getSeconds())
  }`;

const IndustryInfo = ({ industriesData }) => {
  const [spcbTime, setSpcbTime] = useState("-----------------------");
  const [cpcbTime, setCpcbTime] = useState("-----------------------");
  const [spcbColor, setSpcbColor] = useState("red");
  const [cpcbColor, setCpcbColor] = useState("red");
  const deviceStates = industriesData.devices.map(
    ({ status, device_name }) => ({ status, device_name })
  );

  // FOR CPCB
  useEffect(() => {
    setCpcbTime("-----------------------");
    (async () => {
      try {
        const result = await axios(
          `${
            window.apiURL
          }/pcb_logs/last_data_by_device?device_name=${deviceStates
            .map((item) => item.device_name)
            .join("+")}&board=CPCB`
        );

        if (result.data.log) {
          const currMili = Date.now();
          const d = new Date(result.data.log.createdAt);
          const date = generateDateStr(d);

          if (currMili - 1000 * 60 * 60 * 24 * 2 > result.data.log.createdAt) {
            setCpcbColor("red");
          } else if (
            currMili - 1000 * 60 * 60 * 4 >
            result.data.log.createdAt
          ) {
            setCpcbColor("yellow");
          } else {
            setCpcbColor("green");
          }
          setCpcbTime(date);
        }
      } catch (error) {
        setCpcbTime("error occur");
      }
    })();
  }, []);

  // FOR SPCB
  useEffect(() => {
    setSpcbTime("-----------------------");
    (async () => {
      try {
        const result = await axios(
          `${
            window.apiURL
          }/pcb_logs/last_data_by_device?device_name=${deviceStates
            .map((item) => item.device_name)
            .join("+")}&board=SPCB`
        );

        if (result.data.log) {
          const currMili = Date.now();
          const d = new Date(result.data.log.createdAt);
          const date = generateDateStr(d);

          if (currMili - 1000 * 60 * 60 * 24 * 2 > result.data.log.createdAt) {
            setSpcbColor("red");
          } else if (
            currMili - 1000 * 60 * 60 * 4 >
            result.data.log.createdAt
          ) {
            setSpcbColor("yellow");
          } else {
            setSpcbColor("green");
          }
          setSpcbTime(date);
        }
      } catch (error) {
        setSpcbTime("error occur");
      }
    })();
  }, []);

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-8">
          <div>
            <h4 className="mb-1">{`${industriesData.industry_name}`}</h4>
            <h6>
              {deviceStates.map(({ status, device_name }) => {
                const color =
                  status === "offline"
                    ? "danger"
                    : status === "delay"
                    ? "warning"
                    : status === "online"
                    ? "success"
                    : "muted";
                return (
                  <span key={device_name} className={`text-${color}`}>
                    {device_name}{" "}
                  </span>
                );
              })}
            </h6>
            {/* <p>
              <FontAwesomeIcon icon={faLocation} className="me-1" />
              <span>
                {industriesData.state
                  ? `${industriesData.state} | ${industriesData.industry_category} `
                  : "no location "}
              </span>
              <span>
                {industriesData.ganga_basin === "false"
                  ? "( Not in ganga basin )"
                  : industriesData.ganga_basin === "true"
                  ? "( Ganga basin )"
                  : "no information about ganga basin"}
              </span>
            </p> */}
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex flex-column align-items-end">
            <div style={{ width: "max-content" }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryInfo;
